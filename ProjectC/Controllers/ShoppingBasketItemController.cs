using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectC.Database.Daos;
using ProjectC.Database.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using ProjectC.Helper;

namespace ProjectC.Controllers
{
    [Authorize(Roles = "User,Admin")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ShoppingBasketItemController : DaoController<ShoppingBasketItemDao, ShoppingBasketItem>
    {
        public ShoppingBasketItemController(ILogger<ShoppingBasketItemController> logger) : base(logger)
        {

        }

        /// <summary>
        /// Add an item to the shopping basket of the session user
        /// </summary>
        [HttpPost]
        public IActionResult Add([FromBody]ShoppingBasketItem input)
        {
            try
            {
                // Get user id
                int userId = UserSession.GetUserId(HttpContext);

                // Obtain users' shopping basket
                var shoppingBasket = GetDaoManager().ShoppingBasketDao.GetShoppingBasketForUser(userId);

                // Obtain shopping basket item (in case it already exists)
                var shoppingBasketItem = GetDao().GetItemByProductForUser(userId, input.ProductId);

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
            catch (MySqlException ex)
            {
                return LogError(ex);
            }

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
            int userId = UserSession.GetUserId(HttpContext);

            ShoppingBasketItem item = GetDao().GetItemByProductForUser(userId, input.Product.Id);

            if (input.Amount <= 0)
            {
                return InnerDelete(item.Id);
            }
            else
            {
                return InnerSave(input, item.Id);
            }
        }

        /// <summary>
        /// Deletes a shoppingcartitem
        /// </summary>
        /// <param name="id">The id of the PRODUCT to delete from the basket</param>
        [HttpDelete("{id}")]
        public override IActionResult Delete(int id)
        {
            int userId = UserSession.GetUserId(HttpContext);
            ShoppingBasketItem item = GetDao().GetItemByProductForUser(userId, id);
            return InnerDelete(item.Id);
        }
    }
}
