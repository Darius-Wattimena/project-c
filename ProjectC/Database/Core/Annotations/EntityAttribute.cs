using System;

namespace ProjectC.Database.Core.Annotations
{
    [AttributeUsage(AttributeTargets.Class)]
    public class EntityAttribute : Attribute
    {
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