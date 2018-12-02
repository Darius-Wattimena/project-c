﻿using System.Collections.Generic;
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
            sqlBuilder.AddParameter("OrderState", Order.OrderStatusPending.ToString());
            return Execute(sqlBuilder.Build(QueryType.Select));
        }

        public List<Order> GetConfirmedOrders()
        {
            var sqlBuilder = new SqlBuilder<Order>(TableConfig);
            sqlBuilder.AddParameter("OrderState", Order.OrderStatusConfirmed.ToString());
            return Execute(sqlBuilder.Build(QueryType.Select));
        }

        public List<Order> GetSendOrders()
        {
            var sqlBuilder = new SqlBuilder<Order>(TableConfig);
            sqlBuilder.AddParameter("OrderState", Order.OrderStatusSend.ToString());
            return Execute(sqlBuilder.Build(QueryType.Select));
        }
    }
}