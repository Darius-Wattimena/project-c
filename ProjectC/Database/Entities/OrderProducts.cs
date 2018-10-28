using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Entities
{
    [Entity]
    public class OrderProducts : IEntity
    {
        public OrderProducts(ShoppingBasketItem shoppingBasketItem)
        {
            this.Amount = shoppingBasketItem.Amount;
            this.ProductId = shoppingBasketItem.ProductId;
        }

        [Field("OrderProductsId", Primary = true)]
        public int Id;

        [Field] public int Amount;
        [Field] public int ProductId;
        [Field] public int OrderId;

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
