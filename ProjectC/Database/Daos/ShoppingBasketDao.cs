using ProjectC.Database.Core;
using ProjectC.Database.Entities;

namespace ProjectC.Database.Daos
{
    public class ShoppingBasketDao : Dao<ShoppingBasket>
    {
        public ShoppingBasketDao(DatabaseContext context, DaoManager manager) : base(context, manager)
        {

        }
    }
}