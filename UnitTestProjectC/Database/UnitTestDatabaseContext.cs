using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectC.Database;

namespace UnitTestProjectC.Database
{
    [TestClass]
    public class UnitTestDatabaseContext
    {
        private static DatabaseContext _instance;

        private static string ConnectionString =
            "server=c-mobile-mysqldbserver.mysql.database.azure.com;port=3306;database=project5;user=mysqldbuser@c-mobile-mysqldbserver;password=dXd+fT+TM$g5EeVgHQcj2j$F;sslMode=none;";

        public static DatabaseContext Get()
        {
            return _instance ?? (_instance = new DatabaseContext(ConnectionString));
        }

        [TestMethod]
        public void SetupDatabaseContext_WithGivenConnectionString()
        {
            DatabaseContext context = new DatabaseContext(ConnectionString);
            bool hasDatabaseContextConnectionString = context.ConnectionString.Equals(ConnectionString);
            Assert.IsTrue(hasDatabaseContextConnectionString);
        }
    }
}
