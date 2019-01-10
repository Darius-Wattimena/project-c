using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectC.Database;
using ProjectC.Database.Core;
using ProjectC.Helper;
using ProjectC.Model;
using System.Collections.Generic;

namespace UnitTestProjectC.Database
{
    [TestClass]
    public class UnitTestOrderProductsDao
    {
        DaoManager daoManager = DaoManager.Get(UnitTestDatabaseContext.Get());

        [TestMethod]
        public void GetOrderWithProductsByIdTest()
        {
            //Arrange
            var OrderProductsDao = daoManager.OrderProductsDao;

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
            var OrderProductsDao = daoManager.OrderProductsDao;

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
            var OrderProductsDao = daoManager.OrderProductsDao;

            var Product_Id = 11;
            var User_Id = 37;

            //Act
            var result = OrderProductsDao.UserHasBoughtProduct(User_Id, Product_Id);

            //Assert
            Assert.IsFalse(result);

        }

        [TestMethod]
        public void GetTotalSoldProductsForMinMaxDaysTest()
        {
            //Arrange
            var OrderProductsDao = daoManager.OrderProductsDao;
            var result = OrderProductsDao.GetTotalSoldProductsForMinMaxDays(new System.DateTime(2019, 1, 9, 12, 0, 0), new System.DateTime(2019, 1, 7, 0, 0, 0));
            Assert.IsInstanceOfType(result, typeof(List<ProductStatisticsModel>));

        }

        [TestMethod]
        public void GetTotalProductsSoldTest()
        {
            //Arrange
            var OrderProductsDao = daoManager.OrderProductsDao;
            var result = OrderProductsDao.GetTotalProductsSold();
            Assert.IsInstanceOfType(result, typeof(List<Statistics>));

        }
    }
}
