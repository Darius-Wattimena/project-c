using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Entities
{
    [Entity]
    public class WishlistItem : IEntity
    {
        [Field("WishlistItemId", Primary = true)]
        public int Id;
        
        [Field] public int ProductId;
        [Field] public int WishlistId;

        public Product Product;

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
