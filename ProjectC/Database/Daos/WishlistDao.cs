using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using System.Collections.Generic;

namespace ProjectC.Database.Daos
{
    public class WishlistDao : Dao<Wishlist>
    {
        public WishlistDao(DatabaseContext context) : base(context) {

        }

        public bool IsOwnedByUser(int userId, int wishlistId) {
            var searchFields = new Dictionary<string, string>()
            {
                { "UserId", userId.ToString() },
                { "WishlistId", wishlistId.ToString() }
            };

            return Find(searchFields).Count != 0;
        }

    }
}
