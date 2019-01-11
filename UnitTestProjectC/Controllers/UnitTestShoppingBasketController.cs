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
    public class UnitTestShoppingBasketController
    {
        public ShoppingBasketController Controller;

        [TestInitialize]
        public void TestInitialize() {
            var serviceCollection = new ServiceCollection()
                .AddLogging();
            serviceCollection.Add(new ServiceDescriptor(typeof(DatabaseContext),
                UnitTestDatabaseContext.Get()));
            serviceCollection.Add(new ServiceDescriptor(typeof(DaoManager),
                DaoManager.Get(UnitTestDatabaseContext.Get())));
            var serviceProvider = serviceCollection.BuildServiceProvider();
            var factory = serviceProvider.GetService<ILoggerFactory>();
            var logger = factory.CreateLogger<ShoppingBasketController>();
            var appSettings = UnitTestAppSettings.Get();
            Controller = new ShoppingBasketController(logger) {
                ControllerContext = new ControllerContext {
                    HttpContext = new DefaultHttpContext {
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
        public void GetBasketItems_AsAdmin_ReturnsOkObjectResult() {

            var result = Controller.GetBasketItems();

            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public void GetBasketItems_AsUser_ReturnsOkObjectResult() {

            var identity = new ClaimsIdentity();
            identity.AddClaim(new Claim(ClaimTypes.Sid, "3"));
            identity.AddClaim(new Claim(ClaimTypes.Role, "User"));
            Controller.ControllerContext.HttpContext.User = new ClaimsPrincipal(identity);

            var result = Controller.GetBasketItems();

            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public void GetBasketItems_NotLoggedIn_ReturnsUnauthorized() {

            Controller.ControllerContext.HttpContext.User = null; //< not logged in

            var result = Controller.GetBasketItems();

            Assert.IsInstanceOfType(result, typeof(UnauthorizedResult));
        }

        [TestMethod]
        public void Clear_LoggedIn_ReturnsOK() {

            var result = Controller.Clear();

            Assert.IsNotInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public void Clear_NotLoggedIn_DoesNotReturnOK() {

            Controller.ControllerContext.HttpContext.User = null; //< not logged in

            var result = Controller.Clear();

            Assert.IsNotInstanceOfType(result, typeof(OkObjectResult));
        }


    }
}
