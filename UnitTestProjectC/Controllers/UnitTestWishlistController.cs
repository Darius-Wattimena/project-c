﻿using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectC.Controllers;
using ProjectC.Database;
using ProjectC.Database.Core;
using UnitTestProjectC.Database;

namespace UnitTestProjectC.Controllers
{
    [TestClass]
    public class UnitTestWishlistController
    {
        public WishlistController Controller;

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
            var logger = factory.CreateLogger<WishlistController>();
            Controller = new WishlistController(logger) {
                ControllerContext = new ControllerContext {
                    HttpContext = new DefaultHttpContext { RequestServices = serviceProvider }
                }
            };
            var identity = new ClaimsIdentity();
            identity.AddClaim(new Claim(ClaimTypes.Sid, "5"));
            identity.AddClaim(new Claim(ClaimTypes.Role, "Admin"));
            Controller.ControllerContext.HttpContext.User = new ClaimsPrincipal(identity);
        }

        [TestMethod]
        public void GetMyWishlists_ReturnsOKObjectResult() {
            IActionResult result = Controller.GetMyWishlists();
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public void GetItems_WithOwnedId_ReturnsOKObjectResult() {
            int wishlistId = 1;
            IActionResult result = Controller.GetItems(wishlistId);
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public void GetItems_WithNonOwnedId_ReturnsBadRequestObjectResult() {
            int wishlistId = 2;
            IActionResult result = Controller.GetItems(wishlistId);
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        [TestMethod]
        public void GetSingle_WithExistingId_ReturnsOKObjectResult() {
            int wishlistId = 1;
            IActionResult result = Controller.Get(wishlistId);
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public void GetSingle_AsAdmin_WithNotOwnedId_ReturnsOKObjectResult() {
            int wishlistId = 1;
            IActionResult result = Controller.Get(wishlistId);
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public void GetSingle_AsUser_WithNotOwnedId_ReturnsBadRequestObjectResult() {

            var identity = new ClaimsIdentity();
            identity.AddClaim(new Claim(ClaimTypes.Sid, "5"));
            identity.AddClaim(new Claim(ClaimTypes.Role, "User"));
            Controller.ControllerContext.HttpContext.User = new ClaimsPrincipal(identity);
            
            int wishlistId = 2;
            IActionResult result = Controller.Get(wishlistId);
            
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

    }
}
