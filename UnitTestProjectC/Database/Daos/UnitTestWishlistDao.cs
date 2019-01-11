using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectC.Database.Core;

namespace UnitTestProjectC.Database.Daos
{
    [TestClass]
    public class UnitTestWishlistDao
    {
        readonly DaoManager daoManager = DaoManager.Get(UnitTestDatabaseContext.Get());

        [TestMethod]
        public void UserWithId5_OwnsWishlistWithId1() {

            bool result = daoManager.WishlistDao.IsOwnedByUser(userId:5, wishlistId:1);

            Assert.IsTrue(result);
        }

    }
}
