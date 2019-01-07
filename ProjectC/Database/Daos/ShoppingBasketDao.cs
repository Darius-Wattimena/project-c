using ProjectC.Database.Core;
using ProjectC.Database.Entities;

namespace ProjectC.Database.Daos
{
    public class ShoppingBasketDao : Dao<ShoppingBasket>
    {
        public ShoppingBasketDao(DatabaseContext context) : base(context)
        {

        }

        /// <summary>
        /// Get the shopping basket that belongs to a single user by providing their user id
        /// </summary>
        public ShoppingBasket GetShoppingBasketForUser(int userId)
        {
            var shoppingBaskets = Find("UserId", userId.ToString());

            return shoppingBaskets.Count > 0 ? shoppingBaskets[0] : null;
        }
    }
}