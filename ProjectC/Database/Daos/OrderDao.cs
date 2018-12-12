using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using ProjectC.Database.SQL;
using ProjectC.Helper;

namespace ProjectC.Database.Daos
{
    public class OrderDao : Dao<Order>
    {
        public OrderDao(DatabaseContext context, DaoManager manager) : base(context, manager)
        {

        }

        public List<Order> GetPendingOrders()
        {
            var sqlBuilder = new SqlBuilder<Order>(TableConfig);

            var queryPart = new MultiQueryPart("OrderState");
            queryPart.AddValue(Order.OrderStatusPending.ToString());
            queryPart.AddValue(Order.OrderStatusConfirmed.ToString());

            sqlBuilder.AddParameters(queryPart);
            //sqlBuilder.AddOrderBy("OrderState");

            return Execute(sqlBuilder.Build(QueryType.Select));
        }

        public List<Statistics> GetTotalOrdersForLastSevenDays(DateTime minDate, DateTime maxDate)
        {
            var sqlQuery = "SELECT \n" +
                "Date(OrderDate) as order_date,\n" +
                "IFNULL((SELECT COUNT(*) FROM `order` \n" +
                "WHERE Date(OrderDate) = order_date), 0) as total_orders\n" +
                "FROM `order`\n" +
                "WHERE OrderDate >= \'" + minDate.ToString("yyyy-MM-dd") + "\'\n" +
                "AND OrderDate < \'" + maxDate.ToString("yyyy-MM-dd") + "\'\n" +
                "GROUP BY DAY(OrderDate) \n" +
                "ORDER BY OrderDate ASC";

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
                            var orderDate = reader.GetDateTime(0);
                            var totalOrder = reader.GetInt32(1);
                            results.Add(new Statistics(orderDate.ToString("yyyy-MM-dd"), totalOrder));
                        }

                        connection.Close();
                        return results;
                    }
                }
            }
        }

        public void SetOrderStateAndSave(int id, int orderState)
        {
            var order = Find(id);
            if (order == null) return;

            order.OrderState = orderState;
            Save(order);
        }
    }
}