using System.Collections.Generic;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Core
{
    internal class TableConfig<T>
        where T : IEntity
    {
        // Name of the table in the database
        public string Name;

        // The field of a table that has the primary key
        public FieldConfig<T> PrimaryFieldConfig;

        // A dictionary with all the FieldConfigs
        public Dictionary<string, FieldConfig<T>> Fields;
    }
}