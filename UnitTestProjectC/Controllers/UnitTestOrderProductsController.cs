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
using UnitTestProjectC.Database;

namespace UnitTestProjectC.Controllers
{
    [TestClass]
    public class UnitTestOrderproductsController
    {
        public OrderProductsController Controller;

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
            var logger = factory.CreateLogger<OrderProductsController>();
            Controller = new OrderProductsController(logger)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext
                    {
                        RequestServices = serviceProvider
                    }
                }
            };
        }

        [TestMethod]
        public void GetByOrderIdTest()
        {
            OkObjectResult result = (OkObjectResult) Controller.GetByOrderId(80);
            List<OrderProductsModel> resultItem = (List<OrderProductsModel>)result.Value;

            Assert.AreEqual(resultItem, typeof(List<OrderProductsModel>));

        }
    }
}
