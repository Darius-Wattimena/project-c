using System.Collections.Generic;
using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using ProjectC.Database.SQL;

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

        public void SetOrderStateAndSave(int id, int orderState)
        {
            var order = Find(id);
            if (order == null) return;

            order.OrderState = orderState;
            Save(order);
        }
    }
}