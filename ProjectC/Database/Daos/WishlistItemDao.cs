using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using System.Collections.Generic;

namespace ProjectC.Database.Daos
{
    public class WishlistItemDao : Dao<WishlistItem>
    {
        public WishlistItemDao(DatabaseContext context, DaoManager manager) : base(context, manager)
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
    }
}