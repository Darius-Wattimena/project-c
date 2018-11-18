using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectC.Database.Daos;
using ProjectC.Database.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace ProjectC.Controllers
{
    [Authorize(Roles = "User,Admin")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ShoppingBasketItemController : DaoController<ShoppingBasketItemDao, ShoppingBasketItem>
    {
        /// <summary>
        /// Add an item to the shopping basket of the session user
        /// </summary>
        [HttpPost]
        public IActionResult Add([FromBody]ShoppingBasketItem input)
        {
            // TODO: Shopping basket table is unnecessary
            // TODO: Remove shopping basket table from database, replace 'ShoppingBasketId' in table ShoppingBasketItem with 'UserId'


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

        /// <summary>
        /// Removes a shopping basket item by providing the product id it is associated with
        /// </summary>
        /// <param name="productId">The product id of the item</param>
        [HttpDelete("{productId}")]
        public IActionResult Remove(int productId)
        {
            // Get user id
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            int userId = int.Parse(identity.FindFirst(ClaimTypes.Sid).Value);

            var shoppingBasket = GetDaoManager().ShoppingBasketDao.GetShoppingBasketForUser(userId); // Get users' shopping basket

            var item = GetDao().GetShoppingBasketItem(shoppingBasket.Id, productId); // Get shopping basket item to delete

            if (item == null)
            {
                return BadRequest("Item does not exist");
            }

            GetDao().Delete(item.Id); // Delete the item

            return Ok("Item was succesfully removed from the cart");
        }

        [HttpGet]
        public IActionResult GetBasketItems()
        {
            // Get user id
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            int userId = int.Parse(identity.FindFirst(ClaimTypes.Sid).Value);

            var shoppingBasket = GetDaoManager().ShoppingBasketDao.GetShoppingBasketForUser(userId);

            if (shoppingBasket == null)
                return BadRequest("No shopping cart :/");

            var items = GetDao().Find("ShoppingBasketId", shoppingBasket.Id.ToString());

            if (items == null) return BadRequest("Something went wrong");

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
