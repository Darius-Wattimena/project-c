using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectC.Database.Core;
using ProjectC.Database.Daos;
using ProjectC.Model;
using System.Collections.Generic;
using ProjectC.Helper;

namespace UnitTestProjectC.Database.Daos
{
    [TestClass]
    public class UnitTestOrderDao
    {
        private static readonly DaoManager DaoManager = DaoManager.Get(UnitTestDatabaseContext.Get());
        private static readonly OrderDao OrderDao = DaoManager.OrderDao;

        [TestMethod]
        public void GetPendingOrders_ReturnsAListOfStockOrders() {
            var pendingOrders = OrderDao.GetPendingOrders();
            Assert.IsInstanceOfType(pendingOrders, typeof(List<StockOrderModel>));
        }

        [TestMethod]
        public void GetTotalOrdersForMinMaxDays_GivenAMinAndMaxDate_ReturningAListOfStatistics()
        {
            var startDate = new DateTime(2018, 12, 7);
            var endDate = new DateTime(2018, 12, 14);

            var statistics = OrderDao.GetTotalOrdersForMinMaxDays(startDate, endDate);
            Assert.IsInstanceOfType(statistics, typeof(List<Statistics>));
        }

        [TestMethod]
        public void GetTotalOrdersForMinMaxDays_GivenAMinAndMaxDate_ReturningAListWhereCountIsBiggerThen0()
        {
            var startDate = new DateTime(2018, 12, 7);
            var endDate = new DateTime(2018, 12, 14);

            var statistics = OrderDao.GetTotalOrdersForMinMaxDays(startDate, endDate);
            bool isBiggerThen0 = statistics.Count > 0;
            Assert.IsTrue(isBiggerThen0);
        }

        [TestMethod]
        public void GetTotalOrdersForMinMaxDays_GivenANotExistingMinAndMaxDate_ReturningAListWhereCountIs0()
        {
            var startDate = DateTime.MinValue;
            var endDate = DateTime.MinValue;

            var statistics = OrderDao.GetTotalOrdersForMinMaxDays(startDate, endDate);
            bool isEmpty = statistics.Count == 0;
            Assert.IsTrue(isEmpty);
        }

        [TestMethod]
        public void GetTotalIncomeForMinMaxDays_GivenAMinAndMaxDate_ReturningAListOfStatistics()
        {
            var startDate = new DateTime(2018, 12, 7);
            var endDate = new DateTime(2018, 12, 14);

            var statistics = OrderDao.GetTotalIncomeForMinMaxDays(startDate, endDate);
            Assert.IsInstanceOfType(statistics, typeof(List<Statistics>));
        }

        [TestMethod]
        public void GetTotalIncomeForMinMaxDays_GivenAMinAndMaxDate_ReturningAListWhereCountIsBiggerThen0()
        {
            var startDate = new DateTime(2018, 12, 7);
            var endDate = new DateTime(2018, 12, 14);

            var statistics = OrderDao.GetTotalIncomeForMinMaxDays(startDate, endDate);
            bool isBiggerThen0 = statistics.Count > 0;
            Assert.IsTrue(isBiggerThen0);
        }

        [TestMethod]
        public void GetTotalIncomeForMinMaxDays_GivenANotExistingMinAndMaxDate_ReturningAListWhereCountIs0()
        {
            var startDate = DateTime.MinValue;
            var endDate = DateTime.MinValue;

            var statistics = OrderDao.GetTotalIncomeForMinMaxDays(startDate, endDate);
            bool isEmpty = statistics.Count == 0;
            Assert.IsTrue(isEmpty);
        }
    }
}
