using System.Reflection;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Core
{
    public class FieldConfig<T> where T : IEntity
    {
        // Database Config
        public string Name;
        public bool Primary;

        //Needed for the SQLBuilder so it knows when it can accept int values of 0
        public bool CanBeZero;

        // Field in code
        public FieldInfo Field;
    }
}