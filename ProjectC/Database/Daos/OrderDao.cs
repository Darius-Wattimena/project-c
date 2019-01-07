using System;
using System.Collections.Generic;
using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using ProjectC.Database.SQL;
using ProjectC.Helper;
using ProjectC.Model;

namespace ProjectC.Database.Daos
{
    public class OrderDao : Dao<Order>
    {
        public OrderDao(DatabaseContext context, DaoManager manager) : base(context, manager)
        {

        }

        public List<StockOrderModel> GetPendingOrders()
        {
            var sqlQuery = "SELECT o.OrderId orderId, \n" +
                           "o.OrderState as state, \n" +
                           "o.OrderDate as date, \n" +
                           "IFNULL((SELECT 0 \n" +
                           "\tFROM `product` as p \n" +
                           "\tLEFT JOIN `orderproducts` as op ON p.ProductId = op.ProductId \n" +
                           "\tWHERE op.OrderId = o.OrderId \n" +
                           "\tAND op.Amount > p.Stock), 1) as onStock_Yn \n" +
                           "FROM `order` as o \n" +
                           "WHERE OrderState = \'0\' \n" +
                           "OR OrderState = \'1\'";
            return Database.ExecuteCustomQuery<StockOrderModel>(sqlQuery, (reader, list) =>
            {
                var item = new StockOrderModel();
                item.OrderId = reader.GetInt32(0);
                item.State = reader.GetInt32(1);
                item.Date = reader.GetDateTime(2);
                item.OnStock = reader.GetInt32(3);
                list.Add(item);
            });
        }

        public List<Statistics> GetTotalOrdersForMinMaxDays(DateTime minDate, DateTime maxDate)
        {
            var sqlQuery = "SELECT \n" +
                "Date(OrderDate) as order_date, \n" +
                "(SELECT COUNT(*) FROM `order` \n" +
                "    WHERE Date(OrderDate) = order_date) as total_orders \n" +
                "FROM `order` \n" +
                "WHERE OrderDate >= \'" + minDate.ToString("yyyy-MM-dd") + "\' \n" +
                "AND OrderDate < \'" + maxDate.ToString("yyyy-MM-dd") + "\' \n" +
                "GROUP BY DAY(OrderDate) \n" +
                "ORDER BY OrderDate ASC";

            return Database.ExecuteCustomQuery<Statistics>(sqlQuery, (reader, list) =>
            {
                var orderDate = reader.GetDateTime(0);
                var totalOrder = reader.GetInt32(1);
                list.Add(new Statistics(orderDate.ToString("yyyy-MM-dd"), totalOrder));
            });
        }

        public List<Statistics> GetTotalIncomeForMinMaxDays(DateTime minDate, DateTime maxDate)
        {
            var sqlQuery = "SELECT \n" +
                           "Date(OrderDate) as order_date, \n" +
                           "SUM(TotalPrice) as total_income \n" +
                           "FROM `order` \n" +
                           "WHERE OrderDate >= \'" + minDate.ToString("yyyy-MM-dd") + "\' \n" +
                           "AND OrderDate < \'" + maxDate.ToString("yyyy-MM-dd") + "\' \n" +
                           "GROUP BY DAY(OrderDate) \n" +
                           "ORDER BY OrderDate ASC";
            return Database.ExecuteCustomQuery<Statistics>(sqlQuery, (reader, list) => { 
                var orderDate = reader.GetDateTime(0);
                var totalIncome = reader.GetInt32(1);
                list.Add(new Statistics(orderDate.ToString("yyyy-MM-dd"), totalIncome));
            });
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