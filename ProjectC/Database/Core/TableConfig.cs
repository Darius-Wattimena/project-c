using System.Collections.Generic;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Core
{
    public class TableConfig<T>
        where T : IEntity
    {
        public string Name;
        public FieldConfig<T> PrimaryFieldConfig;
        public Dictionary<string, FieldConfig<T>> Fields;
    }
}