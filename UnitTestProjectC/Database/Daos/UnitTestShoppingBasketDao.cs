using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectC.Database.Core;
using ProjectC.Database.Daos;
using ProjectC.Database.Entities;

namespace UnitTestProjectC.Database.Daos
{
    [TestClass]
    public class UnitTestShoppingBasketDao
    {
        private static readonly DaoManager DaoManager = DaoManager.Get(UnitTestDatabaseContext.Get());
        private static readonly ShoppingBasketDao ShoppingBasketDao = DaoManager.ShoppingBasketDao;

        [TestMethod]
        public void GetShoppingBasket_UsingUserWithId5_IsId1() {
            var shoppingBasket = ShoppingBasketDao.GetShoppingBasketForUser(5);
            Assert.AreEqual(1, shoppingBasket.Id);
        }

        [TestMethod]
        public void GetShoppingBasket_UsingUserWithNegativeId_IsNull() {
            int nonExistentUserId = -1;
            var shoppingBasket = ShoppingBasketDao.GetShoppingBasketForUser(nonExistentUserId);
            Assert.IsNull(shoppingBasket);
        }
    }
}
