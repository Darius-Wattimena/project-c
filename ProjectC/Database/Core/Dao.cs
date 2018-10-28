using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection;
using ProjectC.Database.Core.Interfaces;
using ProjectC.Database.SQL;

namespace ProjectC.Database.Core
{
    public abstract class Dao<T> where T : IEntity
    {
        private const string LOGGING_SQL_PREFIX = "SQL Executing | ";

        protected readonly DB Database;
        protected readonly Type EntityType;
        protected FieldInfo[] Fields;
        protected readonly TableConfig<T> TableConfig;

        protected readonly DaoManager DaoManager;

        protected Dao(DatabaseContext context, DaoManager manager)
        {
            DaoManager = manager;
            Database = DB.Get(context);
            EntityType = typeof(T);

            TableConfig = DatabaseUtil.CreateTableConfig<T>(EntityType);

            CreateFieldConfigs();
        }

        private void CreateFieldConfigs()
        {
            Fields = EntityType.GetFields(BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);
            foreach(var field in Fields)
            {
                var cfg = DatabaseUtil.CreateFieldConfig<T>(field);

                if (cfg == null)
                {
                    continue;
                }

                if (cfg.Primary)
                {
                    TableConfig.primaryFieldConfig = cfg;
                }
                TableConfig.fields.Add(cfg.Name, cfg);
            }
        }

        protected List<T> Execute(string sql)
        {
            Console.WriteLine(LOGGING_SQL_PREFIX + sql);
            using (var query = DatabaseUtil.CreateQuery(sql, Database))
            {
                Database.OpenConnection();
                using (var reader = query.ExecuteReader())
                {
                    var values = ProcessDataReader(reader);
                    Database.CloseConnection();
                    return values;
                }
            }
        }

        protected int ExecuteCount(string sql)
        {
            Console.WriteLine(LOGGING_SQL_PREFIX + sql);
            var query = DatabaseUtil.CreateQuery(sql, Database);
            Database.OpenConnection();
            var reader = query.ExecuteReader();
            var result = 0;
            while (reader.Read())
            {
                result = reader.GetInt32(0);
            }
            Database.CloseConnection();
            return result;
        }

        protected void ExecuteNoResult(string sql)
        {
            Console.WriteLine(LOGGING_SQL_PREFIX + sql);
            var query = DatabaseUtil.CreateQuery(sql, Database);
            Database.OpenConnection();
            query.ExecuteNonQuery();
            Database.CloseConnection();
        }

        private List<T> ProcessDataReader(IDataReader dataReader)
        {
            var results = new List<T>();

            while(dataReader.Read())
            {
                var result = Activator.CreateInstance<T>();
                foreach (var fieldConfig in TableConfig.fields.Values)
                {
                    var fieldValue = dataReader[fieldConfig.Name];
                    if (fieldValue.GetType() != typeof(DBNull))
                    {
                        fieldConfig.Field.SetValue(result, fieldValue);
                    }
                }
                results.Add(result);
            }
            return results;
        }

        public List<T> Find(string field, string value)
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig);
            sqlBuilder.AddParameter(field, value);
            var query = sqlBuilder.Build(QueryType.Select);
            return Execute(query);
        }

        public List<T> FindByList(string field, List<string> values)
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig);
            sqlBuilder.AddParameters(field, values);
            var query = sqlBuilder.Build(QueryType.Select);
            return Execute(query);
        }

        //TODO add exception if nothing is found
        public T Find(int id)
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig)
            {
                Id = id
            };
            var query = sqlBuilder.Build(QueryType.Select);
            var result = Execute(query);
            return result[0];
        }

        public List<T> Find(Dictionary<string, string> parameters)
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig);
            sqlBuilder.AddParameters(parameters);
            var query = sqlBuilder.Build(QueryType.Select);
            return Execute(query);
        }

        public List<T> FindAll()
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig);
            var query = sqlBuilder.Build(QueryType.Select);
            return Execute(query);
        }

        public List<T> Search(string field, string input)
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig);
            sqlBuilder.AddParameter(field, input, QueryPartType.Like);
            var query = sqlBuilder.Build(QueryType.Select);
            return Execute(query);
        }
        
        public int Count(int id)
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig)
            {
                Id = id
            };
            var query = sqlBuilder.Build(QueryType.SelectCount);
            return ExecuteCount(query);
        }

        public int Count(string field, string value)
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig);
            sqlBuilder.AddParameter(field, value);
            var query = sqlBuilder.Build(QueryType.SelectCount);
            return ExecuteCount(query);
        }

        public int CountAll()
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig);
            var query = sqlBuilder.Build(QueryType.SelectCount);
            return ExecuteCount(query);
        }

        public T Create(T entity)
        {
            entity.SetId(0);
            return Insert(entity);
        }

        public List<T> Save(List<T> entities)
        {
            var resultEntities = new List<T>();
            foreach (var entity in entities)
            {
                resultEntities.Add(Save(entity));
            }
            return resultEntities;
        }

        public T Save(T entity)
        {
            return entity.GetId() == 0 ? Insert(entity) : Update(entity);
        }

        public void Delete(int id)
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig)
            {
                Id = id
            };
            var query = sqlBuilder.Build(QueryType.Delete);
            ExecuteNoResult(query);
        }

        public void Delete(T entity)
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig, entity);
            var query = sqlBuilder.Build(QueryType.Delete);
            ExecuteNoResult(query);
        }

        private T Insert(T entity)
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig, entity);
            var query = sqlBuilder.Build(QueryType.Insert);
            ExecuteNoResult(query);
            var lastId = GetLastInsertedId();
            entity.SetId(lastId);
            return entity;
        }

        private T Update(T entity)
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig, entity);
            var query = sqlBuilder.Build(QueryType.Update);
            ExecuteNoResult(query);
            return entity;
        }

        private int GetLastInsertedId()
        {
            return ExecuteCount("SELECT LAST_INSERT_ID()");
        }
    }
}