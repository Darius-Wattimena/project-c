using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectC.Database.Daos;
using ProjectC.Database.Entities;
using System.Collections.Generic;
using System.Security.Claims;

namespace ProjectC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ShoppingBasketController : DaoController<ShoppingBasketDao, ShoppingBasket>
    {
        [Authorize(Roles = "Admin")]
        public IActionResult Test()
        {
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;

            int userId = int.Parse(identity.FindFirst(ClaimTypes.Sid).Value);
            string role = identity.FindFirst(ClaimTypes.Role).Value;

            return Ok(role);
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
        public override IActionResult Search(string f, string i)
        {
            return InnerSearch(f, i);
        }

        [HttpPost]
        public override IActionResult Create([FromBody] ShoppingBasket input)
        {
            return InnerSave(input);
        }

        [HttpPut("{id}")]
        public override IActionResult Update(int id, [FromBody] ShoppingBasket input)
        {
            return InnerSave(input);
        }

        [HttpDelete("{id}")]
        public override IActionResult Delete(int id)
        {
            return InnerDelete(id);
        }
    }
}
