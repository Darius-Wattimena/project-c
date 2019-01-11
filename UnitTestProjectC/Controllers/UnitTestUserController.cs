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
using ProjectC.Model;

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
        public void Get_IsTypeOfListUser()
        {
            OkObjectResult result = (OkObjectResult)Controller.Get();
            List<User> resultItem = (List<User>)result.Value;

            Assert.IsInstanceOfType(resultItem, typeof(List<User>));
        }

        [TestMethod]
        public void Update_UserOfId()
        {
            OkObjectResult result1 = (OkObjectResult)Controller.Get(21);
            User resultItem1 = (User)result1.Value;
            OkObjectResult result = (OkObjectResult)Controller.Update(resultItem1.Id, resultItem1);

            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public void EditUser_UserOfId()
        {
            UserUpdateModel model = new UserUpdateModel();
            
            OkObjectResult result1 = (OkObjectResult)Controller.Get(21);
            User resultItem1 = (User)result1.Value;

            model.Firstname = resultItem1.Firstname;
            model.Lastname = resultItem1.Lastname;
            model.MailAddress = resultItem1.MailAddress;
            model.Password = "admin";

            OkResult result = (OkResult)Controller.EditUser(21, model);

            Assert.IsInstanceOfType(result, typeof(OkResult));
        }


    }
}
