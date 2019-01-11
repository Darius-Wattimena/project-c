using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectC.Database.Core;
using ProjectC.Database.Daos;

namespace UnitTestProjectC.Database.Daos
{
    [TestClass]
    public class UnitTestWishlistDao
    {
        private static readonly DaoManager DaoManager = DaoManager.Get(UnitTestDatabaseContext.Get());
        private static readonly WishlistDao WishlistDao = DaoManager.WishlistDao;

        [TestMethod]
        public void IsOwnedByUser_GivenAnUserIdAndWishlistId_ReturningABoolean()
        {
            var ownedByUser = WishlistDao.IsOwnedByUser(5, 1);
            Assert.IsInstanceOfType(ownedByUser, typeof(bool));
        }

        [TestMethod]
        public void IsOwnedByUser_GivenAnUserIdAndWishlistId_ReturningTrue()
        {
            var ownedByUser = WishlistDao.IsOwnedByUser(5, 1);
            Assert.IsTrue(ownedByUser);
        }

        [TestMethod]
        public void IsOwnedByUser_GivenANotExistingUserIdAndWishlistId_ReturningFalse()
        {
            var ownedByUser = WishlistDao.IsOwnedByUser(0, 1);
            Assert.IsFalse(ownedByUser);
        }

        [TestMethod]
        public void IsOwnedByUser_GivenAnUserIdAndNotExistingWishlistId_ReturningFalse()
        {
            var ownedByUser = WishlistDao.IsOwnedByUser(5, 0);
            Assert.IsFalse(ownedByUser);
        }
    }
}
