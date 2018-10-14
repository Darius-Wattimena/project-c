using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Entities
{
    [Entity]
    public class Wishlist : IEntity
    {
        [Field("WishlistId", Primary = true)]
        public int Id;

        [Field] public string Name;
        [Field] public int UserId;

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
