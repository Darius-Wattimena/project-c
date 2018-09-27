using System;

namespace ProjectC.Database.Core.Annotations
{
    [AttributeUsage(AttributeTargets.Class)]
    public class Entity : Attribute
    {
        public string TableName { get; }

        public Entity(string tableName)
        {
            TableName = tableName;
        }
    }
}