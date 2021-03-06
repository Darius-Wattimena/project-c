﻿using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Entities
{
    [Entity]
    public class ShoppingBasketItem : IEntity
    {
        [Field("ShoppingBasketItemId", Primary = true)]
        public int Id;

        [Field] public int Amount;
        [Field] public int ProductId;
        [Field] public int ShoppingBasketId;

        public Product Product;

        public int GetId()
        {
            return Id;
        }

        public void SetId(int id)
        {
            this.Id = id;
        }
    }
}
