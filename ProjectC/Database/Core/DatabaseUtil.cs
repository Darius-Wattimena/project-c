using System;
using System.Collections.Generic;
using System.Reflection;
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
                throw new Exception("EntityAttribute not found on the given type " + type.FullName);
            }

            var entityAttr = (EntityAttribute)entityAttribute;

            var tableName = entityAttr.TableName.Equals(string.Empty) ? type.Name : entityAttr.TableName;

            return new TableConfig<T>
            {
                Name = tableName,
                Fields = new Dictionary<string, FieldConfig<T>>()
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
                Primary = fieldAttr.Primary,
                CanBeZero = fieldAttr.CanBeZero
            };

            return cfg;
        }
    }
}