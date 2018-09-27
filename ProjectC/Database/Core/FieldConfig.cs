using System.Reflection;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Core
{
    public class FieldConfig<T> where T : IEntity
    {
        // Database Config
        public string name;
        public Type type;
        public bool primary;
        public int size;
        public int digitSize;

        // Field in code
        public FieldInfo field;
    }
}