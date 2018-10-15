using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Entities
{
    [Entity]
    public class Role : IEntity
    {
        [Field("RoleId", Primary = true)]
        public int Id;

        [Field] public string Name;
        [Field] public int Power;

        public int GetId()
        {
            return Id;
        }

        public void SetId(int id)
        {
            this.Id = id;
        }
    }
}
