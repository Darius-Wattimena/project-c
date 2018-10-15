using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DevOne.Security.Cryptography.BCrypt;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ProjectC.Database.Core;
using ProjectC.Database.Daos;
using ProjectC.Database.Entities;
using ProjectC.Helper;
using ProjectC.Model;

namespace ProjectC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : DaoController<UserDao, User>
    {
        private readonly AppSettings _appSettings;

        public UserController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        [HttpGet]
        public override IActionResult Get()
        {
            return InnerGet();
        }

        [HttpGet("{id}")]
        public override IActionResult Get(int id)
        {
            return InnerGet(id);
        }

        [HttpPost]
        public override IActionResult Create([FromBody] User input)
        {
            return InnerSave(input);
        }

        [HttpPut("{id}")]
        public override IActionResult Update(int id, [FromBody] User input)
        {
            return InnerSave(input);
        }

        [HttpDelete("{id}")]
        public override IActionResult Delete(int id)
        {
            return InnerDelete(id);
        }

        public IActionResult Login([FromBody] UserLoginModel input)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            var databaseUser = daoManager.UserDao.FindUserByMailAddress(input.MailAddress);

            if (databaseUser == null || !BCryptHelper.CheckPassword(input.Password, databaseUser.PasswordHash))
            {
                return BadRequest("Username or password is incorrect");
            }
            
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

            return Ok(databaseUser);
        }

        //Register a user with the given register info
        [HttpPost]
        public IActionResult Register([FromBody] UserRegisterModel input)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();

            if (input.Password.Equals(input.ConfirmPassword))
            {
                return BadRequest("Passwords are not the same");
            }
            
            if (daoManager.UserDao.FindUserByMailAddress(input.MailAddress) != null)
            {
                return BadRequest("Mail address already been used");
            }

            var user = new User(input);
            daoManager.UserDao.Save(user);

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
            
            if (!BCryptHelper.CheckPassword(input.Password, databaseUser.PasswordHash))
            {
                var salt = BCryptHelper.GenerateSalt();
                var hashedPassword = BCryptHelper.HashPassword(input.Password, salt);
                databaseUser.PasswordHash = hashedPassword;
            }
            
            databaseUser.Firstname = input.Firstname;
            databaseUser.Lastname = input.Lastname;
            databaseUser.MailAddress = input.MailAddress;

            daoManager.UserDao.Save(databaseUser);

            return Ok();
        }
    }
}
