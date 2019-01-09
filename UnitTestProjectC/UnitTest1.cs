using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectC.Database.Daos;
using ProjectC.Database;
using ProjectC.Database.Core;
using ProjectC.Database.Entities;

namespace UnitTestProjectC
{
    [TestClass]
    public class UnitTest1
    {
        private DatabaseContext dbContext = new DatabaseContext("server=c-mobile-mysqldbserver.mysql.database.azure.com;port=3306;database=project5;user=mysqldbuser@c-mobile-mysqldbserver;password=dXd+fT+TM$g5EeVgHQcj2j$F;sslMode=none;");

        [TestMethod]
        public void GetUserTest() {
            DaoManager daoManager = DaoManager.Get(dbContext);

            User u = daoManager.UserDao.Find(5);

            Assert.AreEqual(u.Firstname, "Beau");
            Assert.AreEqual(u.MailAddress, "0954603@hr.nl");
        }
    }
}
