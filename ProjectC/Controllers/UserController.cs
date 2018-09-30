using DevOne.Security.Cryptography.BCrypt;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using ProjectC.Model;

namespace ProjectC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        //Get all users
        [HttpGet]
        public string Get()
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            var users = daoManager?.UserDao.FindAll();
            var json = JsonConvert.SerializeObject(users);
            return json;
        }

        //Get 1 user with the given id
        [HttpGet("{id}")]
        public string Get(int id)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            var user = daoManager?.UserDao.Find(id);
            var json = JsonConvert.SerializeObject(user);
            return json;
        }
        
        [HttpPost]
        public void Post([FromBody] string value)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            var user = JsonConvert.DeserializeObject<User>(value);
            daoManager?.UserDao.Save(user);
        }

        public bool Login([FromBody] UserLoginModel input)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            var databaseUser = daoManager.UserDao.FindUserByUsername(input.Username);

            if (databaseUser == null)
            {
                return false;
            }

            var userLoginHashedPassword = BCryptHelper.HashPassword(input.Password, databaseUser.PasswordSalt);
            return userLoginHashedPassword.Equals(databaseUser.PasswordHash);
        }

        //Register a user with the given register info
        [HttpPost]
        public void Register([FromBody] UserRegisterModel input)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            var user = new User(input);
            daoManager?.UserDao.Save(user);
        }

        //Update the given user
        [HttpPut("{id}")]
        public void Update(int id, [FromBody] UserUpdateModel input)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            var databaseUser = daoManager.UserDao.Find(id);

            if (databaseUser == null)
            {
                return;
            }

            databaseUser.Username = input.Username;
            databaseUser.Firstname = input.Firstname;
            databaseUser.Lastname = input.Lastname;
            databaseUser.MailAddress = input.MailAddress;

            daoManager.UserDao.Save(databaseUser);
        }

        //Delete the user with the given id
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            daoManager?.UserDao.Delete(id);
        }
    }
}
