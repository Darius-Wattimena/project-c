using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectC.Controllers;
using ProjectC.Database;
using ProjectC.Database.Core;
using System.Security.Claims;
using UnitTestProjectC.Database;

namespace UnitTestProjectC.Controllers
{
    [TestClass]
    public class UnitTestOrderController
    {
        public OrderController Controller;

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
            var logger = factory.CreateLogger<OrderController>();
            Controller = new OrderController(logger) {
                ControllerContext = new ControllerContext {
                    HttpContext = new DefaultHttpContext {
                        RequestServices = serviceProvider
                    }
                }
            };
            var identity = new ClaimsIdentity();
            identity.AddClaim(new Claim(ClaimTypes.Sid, "5"));
            identity.AddClaim(new Claim(ClaimTypes.Role, "Admin"));
            Controller.ControllerContext.HttpContext.User = new ClaimsPrincipal(identity);
        }

        [TestMethod]
        public void GetMyOrder_WithLoggedInAdmin_ReturnsOK() {
            IActionResult result = Controller.GetByUser();
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public void GetPendingOrders_WithLoggedInAdmin_ReturnsOK() {
            IActionResult result = Controller.GetPendingOrders();
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }
    }
}
