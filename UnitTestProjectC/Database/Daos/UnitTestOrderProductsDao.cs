using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectC.Database.Core;
using ProjectC.Database.Daos;
using ProjectC.Helper;
using ProjectC.Model;

namespace UnitTestProjectC.Database.Daos
{
    [TestClass]
    public class UnitTestOrderProductsDao
    {
        private static readonly DaoManager DaoManager = DaoManager.Get(UnitTestDatabaseContext.Get());
        private static readonly OrderProductsDao OrderProductsDao = DaoManager.OrderProductsDao;

        [TestMethod]
        public void GetOrderWithProductsByIdTest()
        {
            //Arrange
            var Order_Id = 71;
            var OrderProduct_Id = 107;

            //Act
            var result = OrderProductsDao.GetOrderWithProductsById(Order_Id);
            var OrderProduct_Id_Result = result[0].OrderProducts.Id;

            //Assert
            Assert.AreEqual(OrderProduct_Id, OrderProduct_Id_Result);

        }

        [TestMethod]
        public void UserHasBoughtProductTest_True()
        {
            //Arrange
            var Product_Id = 4;
            var User_Id = 37;

            //Act
            var result = OrderProductsDao.UserHasBoughtProduct(User_Id, Product_Id);


            //Assert
            Assert.IsTrue(result);

        }

        [TestMethod]
        public void UserHasBoughtProductTest_False()
        {
            //Arrange
            var Product_Id = 11;
            var User_Id = 37;

            //Act
            var result = OrderProductsDao.UserHasBoughtProduct(User_Id, Product_Id);

            //Assert
            Assert.IsFalse(result);

        }

        [TestMethod]
        public void GetTotalSoldProductsForMinMaxDays_GivenAMinAndMaxDate_ReturningAListOfProductStatisticsModel()
        {
            var startDate = new DateTime(2018, 12, 7);
            var endDate = new DateTime(2018, 12, 14);

            var result = OrderProductsDao.GetTotalSoldProductsForMinMaxDays(startDate, endDate);
            Assert.IsInstanceOfType(result, typeof(List<ProductStatisticsModel>));
        }

        [TestMethod]
        public void GetTotalSoldProductsForMinMaxDays_GivenAMinAndMaxDate_ReturningAListWhereCountIsBiggerThen0()
        {
            var startDate = new DateTime(2018, 12, 7);
            var endDate = new DateTime(2018, 12, 14);

            var statistics = OrderProductsDao.GetTotalSoldProductsForMinMaxDays(startDate, endDate);
            bool isBiggerThen0 = statistics.Count > 0;
            Assert.IsTrue(isBiggerThen0);
        }

        [TestMethod]
        public void GetTotalSoldProductsForMinMaxDays_GivenANotExistingMinAndMaxDate_ReturningAListWhereCountIs()
        {
            var startDate = DateTime.MinValue;
            var endDate = DateTime.MinValue;

            var statistics = OrderProductsDao.GetTotalSoldProductsForMinMaxDays(startDate, endDate);
            bool isEmpty = statistics.Count == 0;
            Assert.IsTrue(isEmpty);
        }

        [TestMethod]
        public void GetTotalProductsSoldTest()
        {
            //Arrange
            var result = OrderProductsDao.GetTotalProductsSold();
            Assert.IsInstanceOfType(result, typeof(List<Statistics>));
        }
    }
}
