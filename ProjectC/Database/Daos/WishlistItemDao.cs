using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using System.Collections.Generic;

namespace ProjectC.Database.Daos
{
    public class WishlistItemDao : Dao<WishlistItem>
    {
        public WishlistItemDao(DatabaseContext context) : base(context)
        {

        }

        public List<WishlistItem> GetWishlistItems(int wishlistId)
        {
            var searchFields = new Dictionary<string, string>()
            {
                { "WishlistId", wishlistId.ToString() }
            };

            return Find(searchFields);
        }

        public bool WishlistItemForProductExists(int wishlistId, int productId) {
            var searchFields = new Dictionary<string, string>()
            {
                { "WishlistId", wishlistId.ToString() },
                { "ProductId", productId.ToString() }
            };

            return Find(searchFields).Count != 0;
        }

    }
}