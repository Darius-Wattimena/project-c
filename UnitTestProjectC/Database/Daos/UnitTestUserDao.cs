using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectC.Database.Core;
using ProjectC.Database.Daos;
using ProjectC.Database.Entities;

namespace UnitTestProjectC.Database.Daos
{
    [TestClass]
    public class UnitTestUserDao
    {
        DaoManager daoManager = DaoManager.Get(UnitTestDatabaseContext.Get());

        [TestMethod]
        public void FindAllUsers_WithTheUserDao_AndReturnsAListOfUsers()
        {
            UserDao userDao = daoManager.UserDao;
            var listOfUsers = userDao.FindAll();
            Assert.IsInstanceOfType(listOfUsers, typeof(List<User>));
        }

        [TestMethod]
        public void FindUserWithId_UsingUserId5_IsFirstnameEqualToBeau()
        {
            UserDao userDao = daoManager.UserDao;
            User user = userDao.Find(5);
            Assert.AreEqual(user.Firstname, "Beau");
        }

        [TestMethod]
        public void FindUserWithId_UsingUserId3_IsUserActive()
        {
            UserDao userDao = daoManager.UserDao;
            User user = userDao.Find(3);
            Assert.AreEqual(user.Active, 1);
        }
    }
}
