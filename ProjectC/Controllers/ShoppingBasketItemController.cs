using Microsoft.AspNetCore.Mvc;
using ProjectC.Database.Daos;
using ProjectC.Database.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace ProjectC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ShoppingBasketItemController : DaoController<ShoppingBasketItemDao, ShoppingBasketItem>
    {
        [HttpPost]
        public IActionResult Add([FromBody]ShoppingBasketItem input)
        {
            // Get user id
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            int userId = int.Parse(identity.FindFirst(ClaimTypes.Sid).Value);

            // Obtain users' shopping basket
            var shoppingBasket = GetDaoManager().ShoppingBasketDao.GetShoppingBasketForUser(userId);

            // Shopping basket for user does not exist
            if (shoppingBasket == null)
                return NotFound("404 - Shopping Basket not found");

            // Obtain shopping basket item (in case it already exists)
            var shoppingBasketItem = GetDao().GetShoppingBasketItem(shoppingBasket.Id, input.ProductId);
            
            if (shoppingBasketItem != null)
            {
                // Item already exists
                // Increment the amount
                shoppingBasketItem.Amount++;
            }
            else
            {
                // Item does not exist, create from input
                shoppingBasketItem = input;
                shoppingBasketItem.Amount = 1;
            }

            // Pair the item with the users' shopping basket
            shoppingBasketItem.ShoppingBasketId = shoppingBasket.GetId();

            return InnerSave(shoppingBasketItem);
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
        public override IActionResult Create([FromBody] ShoppingBasketItem input)
        {
            return InnerSave(input);
        }

        [HttpPut("{id}")]
        public override IActionResult Update(int id, [FromBody] ShoppingBasketItem input)
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
