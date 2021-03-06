﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ProjectC.Database.Core;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.SQL
{
    internal class SqlBuilder<T> where T : IEntity
    {
        private const string NewLine = "\n";
        private const string BasicSelectRange = "*";

        private readonly T _entity;
        private readonly TableConfig<T> _tableConfig;
        private readonly Dictionary<string, QueryPart> _parameters;
        private readonly Dictionary<string, MultiQueryPart> _parametersMulti;
        private readonly Dictionary<string, List<string>> _parameterLists;
        private readonly StringBuilder _query;

        private readonly List<string> _orderBy;
        private readonly List<string> _groupBy;

        public int Id;
        public string SelectRange = BasicSelectRange;

        public SqlBuilder(TableConfig<T> tableConfig) : this(tableConfig, default(T))
        {

        }

        public SqlBuilder(TableConfig<T> tableConfig, T entity)
        {
            _tableConfig = tableConfig;
            _entity = entity;
            _parameters = new Dictionary<string, QueryPart>();
            _parametersMulti = new Dictionary<string, MultiQueryPart>();
            _parameterLists = new Dictionary<string, List<string>>();
            _orderBy = new List<string>();
            _groupBy = new List<string>();
            _query = new StringBuilder();
        }

        public void AddParameter(string key, string value, QueryPartType type = QueryPartType.Equal)
        {
            _parameters.Add(key, new QueryPart(key, value, type));
        }

        public void AddParameters(MultiQueryPart queryPart)
        {
            _parametersMulti.Add(queryPart.Key, queryPart);
        }

        public void AddParameters(string key, List<string> values)
        {
            _parameterLists.Add(key, values);
        }

        public void AddParameters(Dictionary<string, string> parameters)
        {
            parameters.ToList().ForEach(x => _parameters[x.Key] = new QueryPart(x.Key, x.Value));
        }

        public void AddOrderBy(string field)
        {
            _orderBy.Add(field);
        }

        public void AddGroupBy(string field)
        {
            _groupBy.Add(field);
        }

        public string Build(QueryType queryType)
        {
            switch (queryType)
            {
                case QueryType.Select:
                    return BuildSelectQuery();
                case QueryType.SelectCount:
                    if (SelectRange == BasicSelectRange)
                    {
                        SelectRange = "COUNT(*)";
                    }
                    return BuildSelectQuery();
                case QueryType.SelectExists:
                    return "SELECT EXISTS(" + BuildSelectQuery() + ")";
                case QueryType.Insert:
                    return BuildInsertQuery();
                case QueryType.Update:
                    return BuildUpdateQuery();
                case QueryType.Delete:
                    return BuildDeleteQuery();
                default:
                    return "";
            }
        }

        private string BuildSelectQuery()
        {
            _query.Append("SELECT ")
                .Append(SelectRange)
                .Append(" FROM ")
                .Append("`")
                .Append(_tableConfig.Name.ToLower()) // Always use lower case table names
                .Append("`")
                .Append(" WHERE 1=1 ");

            if (_parameters.Count != 0 || _parametersMulti.Count != 0 || _parameterLists.Count != 0)
            {
                foreach (var parameter in _parameters)
                {
                    _query.Append(NewLine);
                    _query.Append(" AND ")
                        .Append(parameter.Key)
                        .Append(" " + parameter.Value.Type.GetString() + " ")
                        .Append("'").Append(parameter.Value.Value).Append("'");
                }

                foreach (var multiQueryPart in _parametersMulti)
                {
                    _query.Append(NewLine);

                    var first = true;
                    _query.Append(" AND (");
                    foreach (var queryPart in multiQueryPart.Value.QueryParts)
                    {
                        if (first)
                        {
                            first = false;
                        }
                        else
                        {
                            _query.Append(" OR ");
                        }

                        _query.Append(queryPart.Key)
                            .Append(" ").Append(queryPart.Type.GetString()).Append(" ")
                            .Append("'").Append(queryPart.Value).Append("'");
                    }

                    _query.Append(") ");
                }

                foreach (var parameterList in _parameterLists)
                {
                    _query.Append(NewLine);

                    var first = true;
                    _query.Append(" AND (");

                    foreach (var item in parameterList.Value)
                    {
                        if (first)
                        {
                            _query.Append(parameterList.Key).Append(" = '").Append(item).Append("'");
                            first = false;
                        }
                        else
                        {
                            _query.Append(" OR ").Append(parameterList.Key).Append(" = '").Append(item).Append("'");
                        }
                    }

                    _query.Append(") ");
                }
            }
            else if (Id != 0)
            {
                _query.Append(NewLine);
                _query.Append(" AND ")
                    .Append(_tableConfig.PrimaryFieldConfig.Name)
                    .Append(" = '").Append(Id).Append("'");
            }

            if (_orderBy.Count != 0)
            {
                _query.Append(NewLine);
                _query.Append(" ORDER BY ");
                var first = true;

                foreach (var field in _orderBy)
                {
                    if (first)
                    {
                        first = false;
                    }
                    else
                    {
                        _query.Append(",");
                    }

                    _query.Append(field);
                }
            }

            if (_groupBy.Count != 0)
            {
                _query.Append(NewLine);
                _query.Append(" GROUP BY ");
                var first = true;

                foreach (var field in _groupBy)
                {
                    if (first)
                    {
                        first = false;
                    }
                    else
                    {
                        _query.Append(",");
                    }

                    _query.Append(field);
                }
            }

            return _query.ToString();
        }

        private void ProcessFieldValue(object value, KeyValuePair<string, FieldConfig<T>> pair, Dictionary<string, string> fields)
        {
            switch (value)
            {
                case null:
                    break;
                case int intValue:
                    if (intValue != 0 || pair.Value.CanBeZero)
                    {
                        fields.Add(pair.Key, value.ToString());
                    }
                    break;
                case DateTime dateValue:
                    var mySqlFormatDate = dateValue.ToString("yyyy-MM-dd HH:mm:ss");
                    fields.Add(pair.Key, mySqlFormatDate);
                    break;
                default:
                    fields.Add(pair.Key, value.ToString());
                    break;
            }
        }

        private string BuildInsertQuery()
        {
            _query.Append("INSERT INTO ")
                .Append("`")
                .Append(_tableConfig.Name)
                .Append("` ")
                .Append(NewLine);

            var fields = new Dictionary<string, string>();
            var fieldNames = new StringBuilder("(");
            var fieldValues = new StringBuilder("VALUES (");

            foreach (var pair in _tableConfig.Fields)
            {
                if (pair.Value.Primary) continue;
                var value = pair.Value.Field.GetValue(_entity);

                ProcessFieldValue(value, pair, fields);
            }

            var firstField = true;
            foreach (var pair in fields)
            {
                var escapedValue = pair.Value.Replace("\n", Environment.NewLine);
                if (firstField)
                {
                    fieldNames.Append(pair.Key);
                    fieldValues.Append("'").Append(escapedValue).Append("'");
                    firstField = false;
                }
                else
                {
                    fieldNames.Append(", ").Append(pair.Key);
                    fieldValues.Append(", '").Append(escapedValue).Append("'");
                }
            }

            fieldNames.Append(") ");
            fieldValues.Append(") ");

            _query.Append(fieldNames).Append(NewLine);
            _query.Append(fieldValues);

            return _query.ToString();
        }

        private string BuildUpdateQuery()
        {
            var fields = new Dictionary<string, string>();
            var where = "";
            foreach (var pair in _tableConfig.Fields)
            {
                if (!pair.Value.Primary)
                {
                    var value = pair.Value.Field.GetValue(_entity);

                    ProcessFieldValue(value, pair, fields);
                }
                else
                {
                    where = " WHERE " + pair.Key + " = '" + pair.Value.Field.GetValue(_entity) + "'";
                }
            }

            _query.Append("UPDATE ")
                .Append("`")
                .Append(_tableConfig.Name)
                .Append("` ")
                .Append(NewLine);

            

            bool firstField = true;
            foreach (var field in fields)
            {
                _query.Append(NewLine);
                if (firstField)
                {
                    _query.Append("SET ").Append(field.Key).Append(" = '").Append(field.Value).Append("'");
                    firstField = false;
                }
                else
                {
                    _query.Append(", ").Append(field.Key).Append(" = '").Append(field.Value).Append("'");
                }
            }

            _query.Append(where);

            return _query.ToString();
        }

        private string BuildDeleteQuery()
        {
            _query.Append("DELETE FROM ")
                .Append("`")
                .Append(_tableConfig.Name)
                .Append("`");

            var first = true;

            if (Id != 0)
            {
                _query.Append(NewLine);
                _query.Append(" WHERE ")
                    .Append(_tableConfig.PrimaryFieldConfig.Name)
                    .Append(" = '").Append(Id).Append("'");
                first = false;
            }

            foreach (var parameter in _parameters)
            {
                _query.Append(NewLine);
                if (first)
                {
                    _query.Append(" WHERE ").Append(parameter.Key).Append(" = '").Append(parameter.Value).Append("'");
                    first = false;
                }
                else
                {
                    _query.Append(" AND ").Append(parameter.Key).Append(" = '").Append(parameter.Value).Append("'");
                }
            }

            return _query.ToString();
        }
    }
}