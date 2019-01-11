using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Reflection;
using System.Security.Principal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using ProjectC.Controllers;
using ProjectC.Database;
using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using ProjectC.Model;
using UnitTestProjectC.Database;

namespace UnitTestProjectC.Controllers
{
    [TestClass]
    public class UnitTestProductController
    {
        public ProductController Controller;
        
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
            var logger = factory.CreateLogger<ProductController>();
            Controller = new ProductController(logger)
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
        public void GetAllWithSpecifications_ReturningAListOfProducts()
        {
            OkObjectResult result = (OkObjectResult) Controller.GetAllWithSpecifications();
            List<Product> resultItems = (List<Product>) result.Value;


            Assert.IsInstanceOfType(resultItems, typeof(List<Product>));
        }

        [TestMethod]
        public void CustomSearch_ReturningSamsungS9()
        {
            OkObjectResult result = (OkObjectResult)Controller.CustomSearch("Samsung S9");
            List<Product> resultItems = (List<Product>)result.Value;
            var Phone = resultItems[0].Id;

            Assert.AreEqual(4, Phone);
        }

        [TestMethod]
        public void GetWithSpecificationsById_ReturnAObjectWithSpecifications()
        {
            OkObjectResult result = (OkObjectResult)Controller.GetWithSpecifications(4);
            Product resultItems = (Product)result.Value;
            var PhoneSpecifications = resultItems.Specifications;

            Assert.IsNotNull(PhoneSpecifications);
        }

        [TestMethod]
        public void GetAllWithoutSpecifications_ReturnProductsWithoutSpecifications()
        {
            OkObjectResult result = (OkObjectResult)Controller.GetAllWithoutSpecifications();
            List<Product> resultItems = (List<Product>)result.Value;
            var PhoneSpecifications = resultItems[0].Specifications;

            Assert.IsNull(PhoneSpecifications);
        }

        [TestMethod]
        public void GetAllWithoutSpecifications_ReturnListOfProducts()
        {
            OkObjectResult result = (OkObjectResult)Controller.GetAllWithoutSpecifications();
            List<Product> resultItems = (List<Product>)result.Value;

            Assert.IsInstanceOfType(resultItems, typeof(List<Product>));
        }

        [TestMethod]
        public void UpdateWithSpecificationsTest()
        {
            ProductSpecificationsModel mock = new ProductSpecificationsModel();
            OkObjectResult result = (OkObjectResult)Controller.GetWithSpecifications(4);
            Product resultItems = (Product)result.Value;
            Specification[] specifications = resultItems.Specifications.ToArray();
            mock.Product = resultItems;
            mock.Specifications = specifications;

            OkResult resulttest = (OkResult) Controller.UpdateWithSpecifications(mock);

            Assert.IsInstanceOfType(resulttest, typeof(OkResult));
        }

        [TestMethod]
        public void ChangeStockTest()
        {
            ProductChangeStockModel mock = new ProductChangeStockModel();
            OkObjectResult result = (OkObjectResult)Controller.GetWithSpecifications(4);
            Product resultItems = (Product)result.Value;
            Specification[] specifications = resultItems.Specifications.ToArray();
            mock.Product = resultItems;
            mock.NewStock = resultItems.Stock;

            OkResult resulttest = (OkResult)Controller.ChangeStock(mock);

            Assert.IsInstanceOfType(resulttest, typeof(OkResult));
        }

        [TestMethod]
        public void UpdateTest()
        {
            ProductChangeStockModel mock = new ProductChangeStockModel();
            OkObjectResult result = (OkObjectResult)Controller.GetWithSpecifications(4);
            Product resultItems = (Product)result.Value;

            OkObjectResult resulttest = (OkObjectResult)Controller.Update(resultItems.Id, resultItems);

            Assert.IsInstanceOfType(resulttest, typeof(OkObjectResult));
        }

        [TestMethod]
        public void RecoverTest()
        {
            ProductChangeStockModel mock = new ProductChangeStockModel();

            OkObjectResult resulttest = (OkObjectResult)Controller.Recover(4);

            Assert.IsInstanceOfType(resulttest, typeof(OkObjectResult));
        }

    }
}
