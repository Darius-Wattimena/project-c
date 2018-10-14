using ProjectC.Database.Core;
using ProjectC.Database.Entities;

namespace ProjectC.Database.Daos
{
    public class WishlistItemDao : Dao<WishlistItem>
    {
        public WishlistItemDao(DatabaseContext context, DaoManager manager) : base(context, manager)
        {

        }
    }
}