using System.Collections.Generic;
using MySql.Data.MySqlClient;
using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using ProjectC.Helper;

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

        public List<Statistics> GetTotalProductsSold()
        {
            var sqlQuery = "SELECT \n" +
                      "ProductId as product_id, \n" +
                      "(SELECT `name` FROM `product` WHERE ProductId = product_id) as product_name, \n" +
                      "SUM(Amount) as total_sold \n" +
                      "FROM `orderproducts` \n" +
                      "GROUP BY ProductId";

            using (var connection = new MySqlConnection(Database.Context.ConnectionString))
            {
                connection.Open();
                using (var command = new MySqlCommand(sqlQuery, connection))
                {
                    using (var reader = command.ExecuteReader())
                    {
                        var results = new List<Statistics>();

                        while (reader.Read())
                        {
                            var productName = reader.GetString(1);
                            var totalSold = reader.GetInt32(2);
                            results.Add(new Statistics(productName, totalSold));
                        }

                        connection.Close();
                        return results;
                    }
                }
            }
        }

        public class OrderProductModel
        {
            public OrderProducts OrderProducts;
            public Product Product;
        }
    }
}