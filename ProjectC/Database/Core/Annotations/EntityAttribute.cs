using System;

namespace ProjectC.Database.Core.Annotations
{
    /// <summary>
    /// Attribute placed at the entity and later converted to a <see cref="TableConfig{T}"/>
    /// </summary>
    [AttributeUsage(AttributeTargets.Class)]
    public class EntityAttribute : Attribute
    {
        //Name of the table inside the database
        public string TableName { get; }

        public EntityAttribute()
        {
            TableName = string.Empty;
        }

        public EntityAttribute(string tableName)
        {
            TableName = tableName;
        }
    }
}