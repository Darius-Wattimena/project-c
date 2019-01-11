using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectC.Database.Core;
using ProjectC.Database.Entities;

namespace UnitTestProjectC.Database.Daos
{
    [TestClass]
    public class UnitTestProductDao
    {
        DaoManager daoManager = DaoManager.Get(UnitTestDatabaseContext.Get());

        [TestMethod]
        public void FindAllWithSpecificationsTest()
        {
            //Arrange
            var ProductDao = daoManager.ProductDao;

            //Act
            var result = ProductDao.FindAllWithSpecifications();

            //Assert
            Assert.IsInstanceOfType(result, typeof(List<Product>));

        }

        [TestMethod]
        public void FindWithSpecificationsTest()
        {
            //Arrange
            var ProductDao = daoManager.ProductDao;
            var SpecificationId = 114;
            //Act
            var result = ProductDao.FindWithSpecifications(4);
            var TestId = result.Specifications[0].Id;
            //Assert
            Assert.AreEqual(TestId, SpecificationId);

        }

        [TestMethod]
        public void SearchProductTest()
        {
            //Arrange
            var ProductDao = daoManager.ProductDao;
            var SearchValue = "Samsung S9";
            var ProductId = 4;

            //Act
            var result = ProductDao.SearchProduct(SearchValue);
            var TestId = result[0].Id;

            //Assert
            Assert.AreEqual(TestId, ProductId);

        }
    }
}
