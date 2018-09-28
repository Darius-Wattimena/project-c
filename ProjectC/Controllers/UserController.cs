using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using ProjectC.Model;

namespace ProjectC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // GET: api/User
        [HttpGet]
        public string Get()
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            var users = daoManager?.UserDao.FindAll();
            var json = JsonConvert.SerializeObject(users);
            return json;
        }

        // GET: api/User/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            var user = daoManager?.UserDao.Find(id);
            var json = JsonConvert.SerializeObject(user);
            return json;
        }

        // POST: api/User
        [HttpPost]
        public void Post([FromBody] string value)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            var user = JsonConvert.DeserializeObject<User>(value);
            daoManager?.UserDao.Save(user);
        }

        [HttpPost]
        public void Register(string value)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            var userRegister = JsonConvert.DeserializeObject<UserRegisterModel>(value);
            var user = new User(userRegister);
            daoManager?.UserDao.Save(user);
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            var user = JsonConvert.DeserializeObject<User>(value);
            user.Id = id;
            daoManager?.UserDao.Save(user);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            daoManager?.UserDao.Delete(id);
        }
    }
}
