using System.Reflection;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Core
{
    public class FieldConfig<T> where T : IEntity
    {
        // Database Config
        public string Name;
        public bool Primary;

        // Field in code
        public FieldInfo Field;
    }
}