using ProjectC.Database.Core;
using ProjectC.Database.Entities;

namespace ProjectC.Database.Daos
{
    public class WishlistDao : Dao<Wishlist>
    {
        public WishlistDao(DatabaseContext context, DaoManager manager) : base(context, manager)
        {

        }
    }
}
