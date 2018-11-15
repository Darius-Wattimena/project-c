using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using System;
using System.Collections.Generic;
using ProjectC.Database.Daos;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace ProjectC.Controllers
{
    [Authorize(Roles = "User")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderController : DaoController<OrderProductsDao, OrderProducts>
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

            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();

            // Obtain user id
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            int userId = int.Parse(identity.FindFirst(ClaimTypes.Sid).Value);

            // Create a new order
            Order newOrder = new Order
            {
                OrderDate = DateTime.Now,
                
                TotalPrice = 0.0,
                OrderState = 0,
                UserId = userId,

                // TODO: Coupon code stuff
                CouponCodeId = null
            };

            shoppingBasketItems.ForEach(item =>
            {
                // Total price is the price multiplied by the amount for each ordered product
                newOrder.TotalPrice += daoManager.ProductDao.Find(item.ProductId).Price * item.Amount;
            });

            // Create the order and retrieve it
            Order createdOrder = daoManager?.OrderDao.Save(newOrder);

            // Add each product that is associated with the order
            shoppingBasketItems.ForEach(item =>
            {
                OrderProducts op = new OrderProducts(item)
                {
                    OrderId = createdOrder.Id
                };
                daoManager?.OrderProductsDao.Save(op);
            });

            return Ok($"Succesfully created a new order for {shoppingBasketItems.Count} products.");
        }

        public override IActionResult Create(OrderProducts input)
        {
            return NotFound();
        }

        public override IActionResult Delete(int id)
        {
            return NotFound();
        }

        public override IActionResult Get()
        {
            return NotFound();
        }

        public override IActionResult Get(int id)
        {
            return NotFound();
        }

        public override IActionResult Search(string field, string input)
        {
            return NotFound();
        }

        public override IActionResult Update(int id, OrderProducts input)
        {
            return NotFound();
        }
    }
}