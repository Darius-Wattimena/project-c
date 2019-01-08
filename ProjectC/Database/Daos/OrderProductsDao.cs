using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using ProjectC.Helper;
using ProjectC.Model;

namespace ProjectC.Database.Daos
{
    public class OrderProductsDao : Dao<OrderProducts>
    {
        public OrderProductsDao(DatabaseContext context) : base(context)
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

        public bool UserHasBoughtProduct(int userId, int productId) {
            var sqlQuery = $@"SELECT Count(OrderId) FROM orderproducts
                                WHERE ProductId = {productId} AND
                                OrderId in (SELECT o.OrderId from `order` as o WHERE o.UserId = {userId})";

            var result = false;

            using (var connection = new MySqlConnection(Database.Context.ConnectionString)) {
                connection.Open();
                using (var command = new MySqlCommand(sqlQuery, connection)) {
                    using (var reader = command.ExecuteReader()) {

                        if (reader.FieldCount > 0) {
                            result = true;
                        }

                        connection.Close();
                    }
                }
            }

            return result;
        }

        public List<ProductStatisticsModel> GetTotalSoldProductsForMinMaxDays(DateTime minDate, DateTime maxDate)
        {
            var sqlQuery = "SELECT p.ProductId AS pid, " +
                           "p.Name, \n" +
                           "o.OrderDate AS date, \n" +
                           "IFNULL(op.Amount, 0) as amount \n" +
                           "FROM `order` as o \n" +
                           "LEFT JOIN `orderproducts` as op ON o.OrderId = op.OrderId \n" +
                           "LEFT JOIN `product` as p ON p.ProductId = op.ProductId \n" +
                           "WHERE OrderDate >= \'" + minDate.ToString("yyyy-MM-dd") + "\' \n" +
                           "AND OrderDate < \'" + maxDate.ToString("yyyy-MM-dd") + "\' \n" +
                           "AND (OrderState = \'0\' OR OrderState = \'1\') \n" +
                           "GROUP BY pid, DAY(date)";
            return ExecuteCustom<ProductStatisticsModel>(sqlQuery, (reader, list) =>
            {
                var date = reader.GetDateTime(2);
                var amount = reader.GetInt32(3);

                var item = new ProductStatisticsModel(date.ToString("yyyy-MM-dd"), amount);
                item.ProductId = reader.GetInt32(0);
                item.ProductName = reader.GetString(1);
                item.Date = date;
                item.Amount = amount;
                list.Add(item);
            });
        }

        public List<Statistics> GetTotalProductsSold()
        {
            var sqlQuery = "SELECT \n" +
                      "ProductId as product_id, \n" +
                      "(SELECT `name` FROM `product` WHERE ProductId = product_id) as product_name, \n" +
                      "SUM(Amount) as total_sold \n" +
                      "FROM `orderproducts` \n" +
                      "GROUP BY ProductId";

            return ExecuteCustom<Statistics>(sqlQuery, (reader, list) =>
            {
                var productName = reader.GetString(1);
                var totalSold = reader.GetInt32(2);
                list.Add(new Statistics(productName, totalSold));
            });
        }

        public class OrderProductModel
        {
            public OrderProducts OrderProducts;
            public Product Product;
        }
    }
}