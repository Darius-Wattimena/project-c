using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Entities
{
    [Entity]
    public class Specification : IEntity
    {
        [Field("SpecificationId", Primary = true)]
        public int Id;

        [Field] public string Name;
        [Field] public string Value;
        [Field] public int ProductId;

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
