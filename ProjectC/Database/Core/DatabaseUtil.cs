using System;
using System.Collections.Generic;
using System.Reflection;
using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Core
{
    internal class DatabaseUtil
    {
        /// <summary>
        /// Create a <see cref="TableConfig{T}"/> instance with the given class <see cref="Type"/>
        /// </summary>
        /// <typeparam name="T">An entity object that implements the IEntity interface</typeparam>
        /// <param name="type">The type instance of the given T object</param>
        /// <returns>An instance of <see cref="TableConfig{T}"/> for the given entity</returns>
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

        /// <summary>
        /// Create a <see cref="FieldConfig{T}"/> instance with the given <see cref="FieldInfo"/>
        /// </summary>
        /// <typeparam name="T">An entity object that implements the IEntity interface</typeparam>
        /// <param name="field">An field object</param>
        /// <returns>An instance of <see cref="FieldConfig{T}"/> when the targeted field has the <see cref="FieldAttribute"/> otherwise return null</returns>
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