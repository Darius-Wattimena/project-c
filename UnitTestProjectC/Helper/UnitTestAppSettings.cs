using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectC.Helper;

namespace UnitTestProjectC.Helper
{
    [TestClass]
    public class UnitTestAppSettings
    {
        private static AppSettings _instance;

        private static string Secret =
            "p34p4zQ5cRUU3LdiDXAjp1Ik4jG0GuCbTJERCGDNnY5txpWfTJZncciLoeeYhZg7";

        public static AppSettings Get()
        {
            return _instance ?? (_instance = new AppSettings {Secret = Secret});
        }

        [TestMethod]
        public void SetupAppSettings_WithGivenSecret()
        {
            AppSettings settings = new AppSettings { Secret = Secret };
            bool hasSecret = settings.Secret.Equals(Secret);
            Assert.IsTrue(hasSecret);
        }
    }
}
