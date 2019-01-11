using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectC.Database.Core;
using ProjectC.Database.Daos;
using ProjectC.Model;
using System.Collections.Generic;

namespace UnitTestProjectC.Database.Daos
{
    [TestClass]
    public class UnitTestOrderDao
    {
        private readonly DaoManager daoManager = DaoManager.Get(UnitTestDatabaseContext.Get());

        [TestMethod]
        public void GetPendingOrders_ReturnsAListOfStockOrders() {
            OrderDao orderDao = daoManager.OrderDao;

            var pendingOrders = orderDao.GetPendingOrders();

            Assert.IsInstanceOfType(pendingOrders, typeof(List<StockOrderModel>));
        }

    }
}
