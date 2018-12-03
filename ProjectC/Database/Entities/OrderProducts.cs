using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Entities
{
    [Entity]
    public class OrderProducts : IEntity
    {
        public OrderProducts()
        {

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

        /// <summary>
        /// Create a new 'orderproduct' from a basket item and bind it to an existing order
        /// </summary>
        /// <param name="shoppingBasketItem">The item to order</param>
        /// <param name="orderId">The ID of an existing order</param>
        public static OrderProducts CreateOrderProduct(ShoppingBasketItem shoppingBasketItem, int orderId)
        {
            return new OrderProducts()
            {
                Amount = shoppingBasketItem.Amount,
                ProductId = shoppingBasketItem.ProductId,
                OrderId = orderId
            };
        }
    }
}
