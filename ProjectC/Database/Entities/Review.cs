using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Entities
{
    [Entity]
    public class Review : IEntity
    {
        [Field("ReviewId", Primary = true)]
        public int Id;

        [Field] public string Body;
        [Field] public int Rating;
        [Field] public int UserId;
        [Field] public int OrderId;

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
