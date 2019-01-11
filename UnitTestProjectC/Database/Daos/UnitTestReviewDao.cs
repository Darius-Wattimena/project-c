using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectC.Database.Core;
using ProjectC.Database.Daos;
using ProjectC.Model;
using System.Collections.Generic;

namespace UnitTestProjectC.Database.Daos
{
    [TestClass]
    public class UnitTestReviewDao
    {
        private static readonly DaoManager DaoManager = DaoManager.Get(UnitTestDatabaseContext.Get());
        private static readonly ReviewDao ReviewDao = DaoManager.ReviewDao;

        [TestMethod]
        public void GetAllForProduct_GivenAProductId_ReturningAListOfTypeReviewDisplayModel()
        {
            var reviews = ReviewDao.GetAllForProduct(4);
            Assert.IsInstanceOfType(reviews, typeof(List<ReviewDisplayModel>));
        }

        [TestMethod]
        public void GetAllForProduct_GivenAProductIdAndUserId_ReturningAListOfTypeReviewDisplayModel()
        {
            var reviews = ReviewDao.GetAllForProduct(4, 3);
            Assert.IsInstanceOfType(reviews, typeof(List<ReviewDisplayModel>));
        }

        [TestMethod]
        public void GetAllForProduct_GivenAProductIdAndUserId_ReturningAListWhereCountIsBiggerThen0()
        {
            var reviews = ReviewDao.GetAllForProduct(4, 3);
            bool isBiggerThen0 = reviews.Count > 0;
            Assert.IsTrue(isBiggerThen0);
        }

        [TestMethod]
        public void GetAllForProduct_GivenANotExistingProductId_ReturningAListWhereCountIs0()
        {
            var reviews = ReviewDao.GetAllForProduct(0);
            bool isEmpty = reviews.Count == 0;
            Assert.IsTrue(isEmpty);
        }

        [TestMethod]
        public void GetAllForAdmin_ReturningAListOfTypeReviewDisplayModel()
        {
            var reviews = ReviewDao.GetAllForAdmin();
            Assert.IsInstanceOfType(reviews, typeof(List<ReviewDisplayModel>));
        }

        [TestMethod]
        public void GetAllForAdmin_ReturningAListWhereCountIsBiggerThen0()
        {
            var reviews = ReviewDao.GetAllForAdmin();
            bool isBiggerThen0 = reviews.Count > 0;
            Assert.IsTrue(isBiggerThen0);
        }
    }
}
