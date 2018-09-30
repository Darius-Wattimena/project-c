<<<<<<< HEAD
=======
﻿using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
>>>>>>> e73ae30df4c75b819bce0d33608a3b5a922b1681
using DevOne.Security.Cryptography.BCrypt;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using ProjectC.Helper;
using ProjectC.Model;

namespace ProjectC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppSettings _appSettings;

        public UserController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        //Get all users
        [HttpGet]
        public IActionResult Get()
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            var users = daoManager?.UserDao.FindAll();
            return Ok(users);
        }

        //Get 1 user with the given id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            var user = daoManager?.UserDao.Find(id);
            return Ok(user);
        }

        //Login a user with the given credentials
        [HttpPost]
        public IActionResult Login([FromBody] UserLoginModel input)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            var databaseUser = daoManager.UserDao.FindUserByUsername(input.Username);

            if (databaseUser == null || !BCryptHelper.CheckPassword(input.Password, databaseUser.PasswordHash))
            {
                return BadRequest("Username or password is incorrect");
            }

            var userLoginHashedPassword = BCryptHelper.HashPassword(input.Password, databaseUser.PasswordSalt);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, databaseUser.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info (without password) and token to store client side
            databaseUser.PasswordHash = null;
            databaseUser.PasswordSalt = null;

            return Ok(databaseUser);
        }

        //Register a user with the given register info
        [HttpPost]
        public IActionResult Register([FromBody] UserRegisterModel input)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            var user = new User(input);
            daoManager?.UserDao.Save(user);

            return Ok();
        }

        //Update the given user
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UserUpdateModel input)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            var databaseUser = daoManager.UserDao.Find(id);

            if (databaseUser == null)
            {
                return BadRequest("User not found");
            }

            databaseUser.Username = input.Username;
            databaseUser.Firstname = input.Firstname;
            databaseUser.Lastname = input.Lastname;
            databaseUser.MailAddress = input.MailAddress;

            daoManager.UserDao.Save(databaseUser);

            return Ok();
        }

        //Delete the user with the given id
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            daoManager?.UserDao.Delete(id);
            return Ok();
        }
    }
}
