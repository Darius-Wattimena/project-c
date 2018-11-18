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
        [Authorize(Roles = "User,Admin")]
        [HttpGet]
        public IActionResult GetBasketItems()
        {
            // Get user id
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            int userId = int.Parse(identity.FindFirst(ClaimTypes.Sid).Value);

            var shoppingBasket = GetDao().GetShoppingBasketForUser(userId);

            if (shoppingBasket == null) return BadRequest("No shopping cart :/");

            var items = GetDaoManager().ShoppingBasketItemDao.Find("ShoppingBasketId", shoppingBasket.Id.ToString());

            if (items == null) return BadRequest("Something went wrong");

            items.ForEach(item => {
                // Store corresponding product inside the item
                item.Product = GetDaoManager().ProductDao.Find(item.ProductId);
            });

            return Ok(items);
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
            return InnerSave(input, id);
        }

        [HttpDelete("{id}")]
        public override IActionResult Delete(int id)
        {
            return InnerDelete(id);
        }
    }
}
