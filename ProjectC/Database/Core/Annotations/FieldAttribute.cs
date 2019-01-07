using System;

namespace ProjectC.Database.Core.Annotations
{
    /// <summary>
    /// Attribute placed at every entity field and later converted to a <see cref="FieldConfig{T}"/>
    /// </summary>
    [AttributeUsage(AttributeTargets.Field)]
    public class FieldAttribute : Attribute
    {
        // Name of the field inside the database table
        public string FieldName { get; set; } = "";
        
        // Set to true when the field is an primary key
        public bool Primary { get; set; } = false;

        // Set to true when the value of the field can have 0 as value
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