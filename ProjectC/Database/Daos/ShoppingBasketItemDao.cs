﻿using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using System.Collections.Generic;

namespace ProjectC.Database.Daos
{
    public class ShoppingBasketItemDao : Dao<ShoppingBasketItem>
    {
        public ShoppingBasketItemDao(DatabaseContext context) : base(context)
        {

        }

        public ShoppingBasketItem GetItemByProductForUser(int userId, int productId)
        {
            int shoppingBasketId = DaoManager.ShoppingBasketDao.GetShoppingBasketForUser(userId).GetId();

            var searchFields = new Dictionary<string, string>()
            {
                { "ShoppingBasketId", shoppingBasketId.ToString() },
                { "ProductId", productId.ToString() }
            };

            var shoppingBasketItems = Find(searchFields);

            return shoppingBasketItems.Count > 0 ? shoppingBasketItems[0] : null;
        }

        public ShoppingBasketItem GetItemByProduct(int shoppingBasketId, int productId)
        {
            var searchFields = new Dictionary<string, string>()
            {
                { "ShoppingBasketId", shoppingBasketId.ToString() },
                { "ProductId", productId.ToString() }
            };

            var shoppingBasketItems = Find(searchFields);

            return shoppingBasketItems.Count > 0 ? shoppingBasketItems[0] : null;
        }
    }
}