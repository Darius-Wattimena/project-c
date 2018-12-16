using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using ProjectC.Database.Daos;
using ProjectC.Database.Entities;
using System.Security.Claims;

namespace ProjectC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AddressController : DaoController<AddressDao, Address>
    {
        public AddressController(ILogger<AddressController> logger) : base(logger)
        {

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

        [HttpGet]
        public IActionResult GetByUser()
        {
            try
            {
                if (!(HttpContext.User.Identity is ClaimsIdentity identity)) return BadRequest("User not found");

                var userId = int.Parse(identity.FindFirst(ClaimTypes.Sid).Value);
                var user = GetDaoManager().UserDao.Find(userId);
                var addressId = user.AddressId;
                var address = GetDaoManager().AddressDao.Find(addressId);
                return Ok(address);
            }
            catch (MySqlException ex)
            {
                return LogError(ex);
            }
        }

        [HttpGet]
        public override IActionResult Search(string f, string i)
        {
            return InnerSearch(f, i);
        }

        [HttpPost]
        public override IActionResult Create([FromBody] Address input)
        {
            return InnerSave(input);
        }

        [HttpPut("{id}")]
        public override IActionResult Update(int id, [FromBody] Address input)
        {
            return InnerSave(input, id);
        }

        [HttpPut]
        public IActionResult ChangeAddress([FromBody] Address input)
        {
            if (!(HttpContext.User.Identity is ClaimsIdentity identity)) return BadRequest("User not found");

            var userId = int.Parse(identity.FindFirst(ClaimTypes.Sid).Value);
            var user = GetDaoManager().UserDao.Find(userId);
            var addressId = user.AddressId;
            return InnerSave(input, addressId);
        }

        [HttpDelete("{id}")]
        public override IActionResult Delete(int id)
        {
            return InnerDelete(id);
        }
    }
}
