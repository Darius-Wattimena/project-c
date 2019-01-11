using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MySql.Data.MySqlClient;
using ProjectC.Database.Core;
using ProjectC.Database.Daos;
using ProjectC.Database.Entities;

namespace UnitTestProjectC.Database.Daos
{
    [TestClass]
    public class UnitTestUserDao
    {
        private static readonly DaoManager DaoManager = DaoManager.Get(UnitTestDatabaseContext.Get());
        private static readonly UserDao UserDao = DaoManager.UserDao;
        
        [TestMethod]
        public void FindUserWithMailAddress_UsingEmail_IsUserIdEqualTo3()
        {
            var foundUser = UserDao.FindUserByMailAddress("dariuswattimena@hotmail.com");
            Assert.AreEqual(foundUser.Id, 3);
        }

        [TestMethod]
        public void SetUserActive_GivingActiveTrueAndUserId3_IsSetToActive()
        {
            var userSetToActive = UserDao.SetActive(true, 3);
            Assert.IsTrue(userSetToActive);
        }

        [TestMethod]
        public void FindAllUsers_WithTheUserDao_AndReturnsAListOfUsers()
        {
            var listOfUsers = UserDao.FindAll();
            Assert.IsInstanceOfType(listOfUsers, typeof(List<User>));
        }

        [TestMethod]
        public void FindUserWithId_GivenAnUserId5_IsFirstnameEqualToBeau()
        {
            var user = UserDao.Find(5);
            Assert.AreEqual(user.Firstname, "Beau");
        }

        [TestMethod]
        public void FindUserWithId_GivenAnUserId3_IsUserActive()
        {
            var user = UserDao.Find(3);
            Assert.AreEqual(user.Active, 1);
        }

        [TestMethod]
        public void ProcessDataReader_GivenAQuery_AndReturnsAListOfUsers()
        {
            var query = "SELECT * FROM `user` WHERE UserId = 5";

            List<User> queryResult;
            using (var connection = new MySqlConnection(UnitTestDatabaseContext.Get().ConnectionString))
            {
                connection.Open();
                using (var command = new MySqlCommand(query, connection))
                {
                    using (var reader = command.ExecuteReader())
                    {
                        queryResult = UserDao.ProcessDataReader(reader);
                        connection.Close();
                    }
                }
            }

            Assert.IsInstanceOfType(queryResult, typeof(List<User>));
        }

        [TestMethod]
        public void ProcessDataReader_GivenAQuery_AndReturnsAUserWithId5()
        {
            var query = "SELECT * FROM `user` WHERE UserId = 5";

            List<User> queryResult;
            using (var connection = new MySqlConnection(UnitTestDatabaseContext.Get().ConnectionString))
            {
                connection.Open();
                using (var command = new MySqlCommand(query, connection))
                {
                    using (var reader = command.ExecuteReader())
                    {
                        queryResult = UserDao.ProcessDataReader(reader);
                    }

                    connection.Close();
                }
            }
            var foundUser = queryResult[0];

            Assert.AreEqual(foundUser.Id, 5);
        }

        [TestMethod]
        public void CheckIfExists_GivenAnUserId5_IsReturningTrue()
        {
            var doesUserExists = UserDao.CheckIfExists(5);
            Assert.IsTrue(doesUserExists);
        }

        [TestMethod]
        public void CheckIfExists_GivenAnUserIdMinus1_IsReturningFalse()
        {
            var doesUserExists = UserDao.CheckIfExists(-1);
            Assert.IsFalse(doesUserExists);
        }

        [TestMethod]
        public void Find_GivenFieldUserIdAndValue5_IsReturningAListOfUsers()
        {
            var foundUsers = UserDao.Find("UserId", "5");
            Assert.IsInstanceOfType(foundUsers, typeof(List<User>));
        }

        [TestMethod]
        public void Find_GivenFieldUserIdAndValue3_IsReturningAUserWithFirstNameDarius()
        {
            var foundUsers = UserDao.Find("UserId", "3");
            var firstFoundUser = foundUsers[0];
            Assert.AreEqual(firstFoundUser.Firstname, "Darius");
        }

        [TestMethod]
        public void Find_GivenFieldUserIdAndValue5_IsNotReturningAUserWithFirstNameBeau()
        {
            var foundUsers = UserDao.Find("UserId", "5");
            var firstFoundUser = foundUsers[0];
            Assert.AreEqual(firstFoundUser.Firstname, "Beau");
        }

        [TestMethod]
        public void FindByList_GivenFieldUserIdAndAListOfValues_IsReturningAListOfUsers()
        {
            var values = new List<string>
            {
                "3", "5", "0"
            };
            var foundUsers = UserDao.FindByList("UserId", values);

            Assert.IsInstanceOfType(foundUsers, typeof(List<User>));
        }

        [TestMethod]
        public void FindByList_GivenFieldUserIdAndAListOfValues_IsReturningAListWith2Users()
        {
            var values = new List<string>
            {
                "3", "5", "0"
            };
            var foundUsers = UserDao.FindByList("UserId", values);

            Assert.AreEqual(foundUsers.Count, 2);
        }

        [TestMethod]
        public void Find_GivenADictionaryOfFieldsAndValues_IsReturningAListOfUsers()
        {
            var parameters = new Dictionary<string, string>
            {
                {"UserId", "3"}, {"Firstname", "Darius"}
            };
            var foundUsers = UserDao.Find(parameters);

            Assert.IsInstanceOfType(foundUsers, typeof(List<User>));
        }

        [TestMethod]
        public void Find_GivenADictionaryOfFieldsAndValues_IsReturningAListWith1User()
        {
            var parameters = new Dictionary<string, string>
            {
                {"UserId", "3"}, {"Firstname", "Darius"}
            };
            var foundUsers = UserDao.Find(parameters);

            Assert.AreEqual(foundUsers.Count, 1);
        }

        [TestMethod]
        public void Search_GivenFieldUserIdAndInput3_IsReturningAListOfUsers()
        {
            var foundUsers = UserDao.Search("UserId", "3");

            Assert.IsInstanceOfType(foundUsers, typeof(List<User>));
        }

        [TestMethod]
        public void Search_GivenFieldUserIdAndInputTest123_IsReturningAEmptyList()
        {
            var foundUsers = UserDao.Search("UserId", "Test123");

            Assert.AreEqual(foundUsers.Count, 0);
        }

        [TestMethod]
        public void Count_GivenAUserId3_IsReturning1()
        {
            var totalFoundUsersWithId3 = UserDao.Count(3);

            Assert.AreEqual(totalFoundUsersWithId3, 1);
        }

        [TestMethod]
        public void Count_GivenAUserId3_IsReturningAnInteger()
        {
            var totalFoundUsersWithId3 = UserDao.Count(3);

            Assert.IsInstanceOfType(totalFoundUsersWithId3, typeof(int));
        }

        [TestMethod]
        public void Count_GivenFieldUserIdAndValue3_IsReturning1()
        {
            var totalFoundUsersWithId3 = UserDao.Count("UserId", "3");

            Assert.AreEqual(totalFoundUsersWithId3, 1);
        }

        [TestMethod]
        public void Count_GivenFieldUserIdAndValue3_IsReturningAnInteger()
        {
            var totalFoundUsersWithId3 = UserDao.Count("UserId", "3");

            Assert.IsInstanceOfType(totalFoundUsersWithId3, typeof(int));
        }

        [TestMethod]
        public void CountAll_IsReturningAnInteger()
        {
            var totalAllUsers = UserDao.CountAll();

            Assert.IsInstanceOfType(totalAllUsers, typeof(int));
        }

        [TestMethod]
        public void CountAll_IsReturningANumberBiggerThen0()
        {
            var totalAllUsers = UserDao.CountAll();
            var totalUsersIsBiggerThen0 = totalAllUsers > 0;

            Assert.IsTrue(totalUsersIsBiggerThen0);
        }

        [TestMethod]
        public void Save_FindUser3AndSaveInTheDatabase_IsReturningAUserWithId3()
        {
            const int userId = 3;
            var user3 = UserDao.Find(userId);
            var saveUser3 = UserDao.Save(user3);
            
            Assert.AreEqual(saveUser3.Id, userId);
        }
    }
}
