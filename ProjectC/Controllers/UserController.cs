using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using DevOne.Security.Cryptography.BCrypt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MySql.Data.MySqlClient;
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

        public UserController(IOptions<AppSettings> appSettings, ILogger<UserController> logger) : base(logger)
        {
            _appSettings = appSettings.Value;
        }

        /// <summary>
        /// Get all users
        /// </summary>
        [Authorize( Roles = "Admin" )]
        [HttpGet]
        public override IActionResult Get()
        {
            var users = GetDao().FindAll();
            return Ok(users);
        }

        /// <summary>
        /// Get single user
        /// </summary>
        [HttpGet("{id}"), Authorize(Roles = "Admin")]
        public override IActionResult Get(int id)
        {
            return InnerGet(id);
        }

        [HttpGet, Authorize(Roles = "Admin")]
        public override IActionResult Search(string f, string i)
        {
            var users = GetDao().Search(f, i);
            return Ok(users);
        }

        [HttpPost, Authorize(Roles = "Admin")]
        public override IActionResult Create([FromBody] User input)
        {
            return InnerSave(input);
        }

        [HttpPut("{id}")]
        public override IActionResult Update(int id, [FromBody] User input)
        {
            if (UserSession.GetUserId(HttpContext) != id && !UserSession.GetUserRole(HttpContext).Equals("Admin")) {
                return BadRequest("Sender is not allowed to update this user.");
            }

            return InnerSave(input, id);
        }

        [HttpDelete("{id}"), Authorize(Roles = "Admin")]
        public override IActionResult Delete(int id)
        {
            if (GetDao().SetActive(false, id)) {
                return Ok();
            }

            return BadRequest();
        }

        // TODO ~needs rework/cleanup
        public IActionResult Login([FromBody] UserLoginModel input)
        {
            GetLogger().Info("Logging in.");

            try
            {
                var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
                var databaseUser = daoManager.UserDao.FindUserByMailAddress(input.MailAddress);

                if (databaseUser == null || !BCryptHelper.CheckPassword(input.Password, databaseUser.PasswordHash))
                {
                    return BadRequest("Username or password is incorrect");
                }

                if (databaseUser.Active == 0)
                {
                    return BadRequest("The account you are trying to login into seems to be deactivated. Please contact the webshop administrator to resolve this problem.");
                }

                JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                byte[] key = Encoding.ASCII.GetBytes(_appSettings.Secret);

                // Obtain the users' role name
                string roleName = daoManager.RoleDao.Find(databaseUser.RoleId).Name;

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        // Store user id as claim
                        new Claim(ClaimTypes.Sid, databaseUser.Id.ToString()),
                        // Store user role as claim
                        new Claim(ClaimTypes.Role, roleName)
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha256Signature)
                };
                SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
                string tokenString = tokenHandler.WriteToken(token);

                // return basic user info (without password, id, etc...) and token to store client side
                object user = new
                {
                    firstName = databaseUser.Firstname,
                    lastName = databaseUser.Lastname,
                    mailAddress = databaseUser.MailAddress,
                    token = tokenString,
                    role = roleName
                };

                return Ok(user);
            }
            catch (MySqlException ex)
            {
                return LogError(ex);
            }
        }

        //Register a user with the given register info
        [HttpPost]
        public IActionResult Register([FromBody] UserRegisterModel input)
        {
            try
            {
                if (!input.Password.Equals(input.ConfirmPassword))
                {
                    return BadRequest("Passwords are not the same");
                }

                var daoManager = HttpContext.RequestServices.GetService<DaoManager>();

                if (daoManager.UserDao.FindUserByMailAddress(input.MailAddress) != null)
                {
                    return BadRequest("Mail address already been used");
                }

                if (!Regex.IsMatch(input.MailAddress, @"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")) {
                    return BadRequest("Mail address is not valid");
                }

                input.Active = 1;
                input.RoleId = 1;

                var user = input.SetupUser(input);
                var address = input.Address;

                // Create user
                var createdAddress = daoManager.AddressDao.Save(address);
                user.AddressId = createdAddress.Id;

                var createdUser = daoManager.UserDao.Save(user);

                // Create shopping basket for user
                daoManager.ShoppingBasketDao.Save(new ShoppingBasket {UserId = createdUser.Id});

                return Ok();
            }
            catch (MySqlException ex)
            {
                return LogError(ex);
            }
        }

        //Update the given user
        [HttpPut("{id}")]
        public IActionResult EditUser(int id, [FromBody] UserUpdateModel input)
        {
            try
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

                // TODO: Define and add constraints for these properties
                databaseUser.Firstname = input.Firstname;
                databaseUser.Lastname = input.Lastname;
                databaseUser.MailAddress = input.MailAddress;

                if (!Regex.IsMatch(input.MailAddress, @"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")) {
                    return BadRequest("Email address not valid");
                }

                daoManager.UserDao.Save(databaseUser);

                return Ok();
            }
            catch (MySqlException ex)
            {
                return LogError(ex);
            }
        }

        [HttpGet]
        public IActionResult GetUser()
        {
            if (!(HttpContext.User.Identity is ClaimsIdentity identity)) return BadRequest("User not found");

            var userId = int.Parse(identity.FindFirst(ClaimTypes.Sid).Value);
            var user = GetDao().Find(userId);
            return Ok(user);
        }

        [HttpPut]
        public IActionResult ChangeUserName([FromBody] User input)
        {
            if (!(HttpContext.User.Identity is ClaimsIdentity identity)) return BadRequest("User not found");

            var userId = int.Parse(identity.FindFirst(ClaimTypes.Sid).Value);
            return InnerSave(input, userId);
        }

        [HttpPut("{id}")]
        public IActionResult ActivateUser(int id)
        {
            try
            {
                // Find the user with the given id
                var databaseUser = GetDao().Find(id);

                if (databaseUser == null)
                {
                    return BadRequest("User not found");
                }

                // Activate the user and save the change to the database
                databaseUser.Active = 1;
                GetDao().Save(databaseUser);

                return Ok();
            }
            catch (MySqlException ex)
            {
                return LogError(ex);
            }
        }

        [HttpPut("{id}")]
        public IActionResult ToggleActivateUser(int id)
        {
            try
            {
                // Find the user with the given id
                var databaseUser = GetDao().Find(id);

                if (databaseUser == null)
                {
                    return BadRequest("User not found");
                }

                // toggle the user activation of the user and save the change to the database
                databaseUser.Active = databaseUser.Active == 1 ? 0 : 1;

                databaseUser = GetDao().Save(databaseUser);

                return Ok(databaseUser);
            }
            catch (MySqlException ex)
            {
                return LogError(ex);
            }
        }
    }
}