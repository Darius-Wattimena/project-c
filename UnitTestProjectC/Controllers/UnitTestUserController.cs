using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectC.Controllers;
using ProjectC.Database;
using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.Extensions.Options;
using ProjectC.Helper;
using UnitTestProjectC.Database;
using UnitTestProjectC.Helper;

namespace UnitTestProjectC.Controllers
{
    [TestClass]
    public class UnitTestUserController
    {
        public UserController Controller;

        [TestInitialize]
        public void TestInitialize()
        {
            var serviceCollection = new ServiceCollection()
                .AddLogging();
            serviceCollection.Add(new ServiceDescriptor(typeof(DatabaseContext),
                UnitTestDatabaseContext.Get()));
            serviceCollection.Add(new ServiceDescriptor(typeof(DaoManager),
                DaoManager.Get(UnitTestDatabaseContext.Get())));
            var serviceProvider = serviceCollection.BuildServiceProvider();
            var factory = serviceProvider.GetService<ILoggerFactory>();
            var logger = factory.CreateLogger<UserController>();
            var appSettings = UnitTestAppSettings.Get();
            Controller = new UserController(new OptionsWrapper<AppSettings>(appSettings), logger)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext
                    {
                        RequestServices = serviceProvider
                    }
                }
            };
            var identity = new ClaimsIdentity();
            identity.AddClaim(new Claim(ClaimTypes.Sid, "3"));
            identity.AddClaim(new Claim(ClaimTypes.Role, "Admin"));
            Controller.ControllerContext.HttpContext.User = new ClaimsPrincipal(identity);
        }

        [TestMethod]
        public void GetByOrderIdTest()
        {

        }
    }
}
