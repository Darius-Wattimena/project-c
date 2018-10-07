using System.Reflection;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Core
{
    public class FieldConfig<T> where T : IEntity
    {
        // Database Config
        public string Name;
        public FieldType FieldType;
        public bool Primary;
        public int Size;
        public int DigitSize;

        // Field in code
        public FieldInfo Field;
    }
}