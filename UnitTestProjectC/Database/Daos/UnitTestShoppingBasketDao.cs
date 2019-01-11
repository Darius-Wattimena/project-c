using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectC.Database.Core;
using ProjectC.Database.Daos;
using ProjectC.Database.Entities;

namespace UnitTestProjectC.Database.Daos
{
    [TestClass]
    public class UnitTestShoppingBasketDao
    {
        private readonly DaoManager daoManager = DaoManager.Get(UnitTestDatabaseContext.Get());

        [TestMethod]
        public void GetShoppingBasket_UsingUserWithId5_IsId1() {

            ShoppingBasketDao shoppingBasketDao = daoManager.ShoppingBasketDao;

            ShoppingBasket shoppingBasket = shoppingBasketDao.GetShoppingBasketForUser(5);

            Assert.AreEqual<int>(1, shoppingBasket.Id);
        }

        [TestMethod]
        public void GetShoppingBasket_UsingUserWithNegativeId_IsNull() {

            ShoppingBasketDao shoppingBasketDao = daoManager.ShoppingBasketDao;

            int nonExistentUserId = -1;

            ShoppingBasket shoppingBasket = shoppingBasketDao.GetShoppingBasketForUser(nonExistentUserId);

            Assert.IsNull(shoppingBasket);
        }

    }
}
