using System.Collections.Generic;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Core
{
    public class TableConfig<T>
        where T : IEntity
    {
        public string name;
        public FieldConfig<T> primaryFieldConfig;
        public Dictionary<string, FieldConfig<T>> fields;
    }
}