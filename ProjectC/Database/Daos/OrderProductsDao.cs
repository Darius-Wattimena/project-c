using System.Collections.Generic;
using ProjectC.Database.Core;
using ProjectC.Database.Entities;

namespace ProjectC.Database.Daos
{
    public class OrderProductsDao : Dao<OrderProducts>
    {
        public OrderProductsDao(DatabaseContext context, DaoManager manager) : base(context, manager)
        {

        }

        public List<OrderProductModel> GetOrderWithProductsById(int id)
        {

            List<OrderProductModel> list = new List<OrderProductModel>();

            var op = Find("OrderId", id.ToString());

            foreach(OrderProducts opm in op) { 
                var product = DaoManager.ProductDao.FindById(opm.ProductId);

                OrderProductModel model = new OrderProductModel();
                model.OrderProducts = opm;
                model.Product = product;
                list.Add(model);
            }

            return list;
        }

        public class OrderProductModel
        {
            public OrderProducts OrderProducts;
            public Product Product;
        }
    }
}