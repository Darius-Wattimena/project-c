using ProjectC.Database.Core;
using ProjectC.Database.Entities;

namespace ProjectC.Database.Daos
{
    public class ShoppingBasketItemDao : Dao<ShoppingBasketItem>
    {
        public ShoppingBasketItemDao(DatabaseContext context, DaoManager manager) : base(context, manager)
        {

        }
    }
}