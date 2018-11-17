using System;

namespace ProjectC.Database.Core.Annotations
{
    [AttributeUsage(AttributeTargets.Field)]
    public class FieldAttribute : Attribute
    {
        public string FieldName { get; set; } = "";
        public bool Primary { get; set; } = false;
        public bool CanBeZero { get; set; } = false;

        public FieldAttribute()
        {

        }

        public FieldAttribute(string fieldName)
        {
            FieldName = fieldName;
        }
    }
}