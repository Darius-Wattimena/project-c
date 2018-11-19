using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using System;
using System.Collections.Generic;
using ProjectC.Database.Daos;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Linq;

namespace ProjectC.Controllers
{
    [Authorize(Roles = "Admin,User")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderController : DaoController<OrderDao, Order>
    {

        // POST: api/Order/Create
        /// <summary>
        /// Creates a new order for the 
        /// </summary>
        /// <param name="shoppingBasketItems">The items from the shopping cart to order</param>
        [HttpPost]
        public IActionResult Create([FromBody] List<ShoppingBasketItem> shoppingBasketItems)
        {
            if (shoppingBasketItems.Count < 1)
            {
                return BadRequest("No items to order");
            }

            // Obtain user id
            if (!(HttpContext.User.Identity is ClaimsIdentity identity)) return BadRequest("User not found");
            
            var userId = int.Parse(identity.FindFirst(ClaimTypes.Sid).Value);

            // Create a new order
            var newOrder = new Order
            {
                OrderDate = DateTime.Now,

                TotalPrice = shoppingBasketItems.Sum(
                    item => GetDaoManager().ProductDao.Find(item.ProductId).Price * item.Amount),

                OrderState = 0,
                UserId = userId,

                // TODO: Coupon code stuff
                CouponCodeId = null
            };

            var createdOrder = GetDaoManager().OrderDao.Save(newOrder);

            // Add each product that is associated with the order
            shoppingBasketItems.ForEach(item =>
            {
                var op = new OrderProducts(item)
                {
                    OrderId = createdOrder.Id
                };
                GetDaoManager().OrderProductsDao.Save(op);
            });

            return Ok($"Succesfully created a new order for {shoppingBasketItems.Count} products.");
        }

        public override IActionResult Create(Order input)
        {
            return InnerSave(input);
        }

        public override IActionResult Delete(int id)
        {
            return InnerDelete(id);
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
            if (!(HttpContext.User.Identity is ClaimsIdentity identity)) return BadRequest("User not found");
   
            var userId = int.Parse(identity.FindFirst(ClaimTypes.Sid).Value);
            var ui = userId.ToString();
            return InnerSearch("UserId", ui);
        }

        public override IActionResult Search(string field, string input)
        {
            return InnerSearch(field, input);
        }

        public override IActionResult Update(int id, Order input)
        {
            return InnerSave(input, id);
        }
    }
}