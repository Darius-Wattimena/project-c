using System;
using System.Collections.Generic;
using System.Reflection;
using MySql.Data.MySqlClient;
using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Core
{
    internal class DatabaseUtil
    {
        public static TableConfig<T> CreateTableConfig<T>(Type type)
            where T : IEntity
        {
            var entityAttribute = type.GetCustomAttribute(typeof(EntityAttribute));

            if (entityAttribute == null)
            {
                return new TableConfig<T>();
            }

            var entityAttr = (EntityAttribute)entityAttribute;

            var tableName = entityAttr.TableName.Equals(string.Empty) ? type.Name : entityAttr.TableName;

            return new TableConfig<T>
            {
                name = tableName,
                fields = new Dictionary<string, FieldConfig<T>>()
            };
        }

        public static FieldConfig<T> CreateFieldConfig<T>(FieldInfo field)
            where T : IEntity
        {
            var fieldAttribute = field.GetCustomAttribute(typeof(FieldAttribute));

            if (fieldAttribute == null)
            {
                return null;
            }

            var fieldAttr = (FieldAttribute)fieldAttribute;

            var fieldName = fieldAttr.FieldName == "" ? field.Name : fieldAttr.FieldName;

            var cfg = new FieldConfig<T>
            {
                Field = field,
                Name = fieldName,
                Primary = fieldAttr.Primary
            };

            return cfg;
        }

        public static MySqlCommand CreateQuery(string sql, DB database)
        {
            return new MySqlCommand(sql, database.GetConnection());
        }
    }
}