using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectC.Database.Core;
using ProjectC.Database.Daos;
using ProjectC.Database.Entities;

namespace UnitTestProjectC.Database.Daos
{
    [TestClass]
    public class UnitTestWishlistItemDao
    {
        private static readonly DaoManager DaoManager = DaoManager.Get(UnitTestDatabaseContext.Get());
        private static readonly WishlistItemDao WishlistItemDao = DaoManager.WishlistItemDao;

        [TestMethod]
        public void GetWishlistItems_GivenAWishlistId_ReturningAListOfTypeWishlistItem() {
            var wishlistItems = WishlistItemDao.GetWishlistItems(1);
            Assert.IsInstanceOfType(wishlistItems, typeof(List<WishlistItem>));
        }

        [TestMethod]
        public void GetWishlistItems_GivenAWishlistId_ReturningAListWhereCountIsBiggerThen0()
        {
            var wishlistItems = WishlistItemDao.GetWishlistItems(1);
            bool isBiggerThen0 = wishlistItems.Count > 0;
            Assert.IsTrue(isBiggerThen0);
        }

        [TestMethod]
        public void GetWishlistItems_GivenANotExistingWishlistId_ReturningAListWhereCountIs0()
        {
            var wishlistItems = WishlistItemDao.GetWishlistItems(0);
            bool isEmpty = wishlistItems.Count == 0;
            Assert.IsTrue(isEmpty);
        }

        [TestMethod]
        public void WishlistItemForProductExists_GivenAWishlistIdAndProductId_ReturningABoolean()
        {
            var doesExists = WishlistItemDao.WishlistItemForProductExists(1, 4);
            Assert.IsInstanceOfType(doesExists, typeof(bool));
        }

        [TestMethod]
        public void WishlistItemForProductExists_GivenAWishlistIdAndProductId_ReturningTrue()
        {
            var doesExists = WishlistItemDao.WishlistItemForProductExists(1, 4);
            Assert.IsTrue(doesExists);
        }

        [TestMethod]
        public void WishlistItemForProductExists_GivenANotExistingWishlistIdAndProductId_ReturningFalse()
        {
            var doesExists = WishlistItemDao.WishlistItemForProductExists(0, 4);
            Assert.IsFalse(doesExists);
        }

        [TestMethod]
        public void WishlistItemForProductExists_GivenAWishlistIdAndNotExistingProductId_ReturningFalse()
        {
            var doesExists = WishlistItemDao.WishlistItemForProductExists(1, 0);
            Assert.IsFalse(doesExists);
        }
    }
}
