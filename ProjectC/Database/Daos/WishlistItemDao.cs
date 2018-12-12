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

        public List<WishlistItem> GetWishlistItems(int userId, int wishlistId)
        {
            var searchFields = new Dictionary<string, string>()
            {
                { "UserId", userId.ToString() },
                { "WishlistId", wishlistId.ToString() }
            };

            return Find(searchFields);
        }

        public List<WishlistItem> GetWishlistItems(int wishlistId)
        {
            // Get associated user id
            var userId = DaoManager.WishlistDao.Find(wishlistId).UserId;

            // Return overload
            return GetWishlistItems(userId, wishlistId);
        }

    }
}