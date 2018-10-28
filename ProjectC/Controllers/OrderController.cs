using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using ProjectC.Helper;
using ProjectC.Model;
using System;
using System.Linq;
using System.Collections.Generic;

namespace ProjectC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderController : ControllerBase
    {

        // POST: api/Order/Create
        [HttpPost]
        public IActionResult Create([FromBody] List<ShoppingBasketItem> shoppingBasketItems)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();

            // Create a new order
            Order newOrder = new Order
            {
                OrderDate = DateTime.Now,
                
                TotalPrice = 0.0,
                OrderState = 0,
                // TODO: Get user ID through authentication
                UserId = 5,
                CouponCodeId = null
            };

            shoppingBasketItems.ForEach(item =>
            {
                // Total price is the price multiplied by the amount for each ordered product
                newOrder.TotalPrice += daoManager.ProductDao.Find(item.ProductId).Price * item.Amount;
            });

            Order createdOrder = daoManager?.OrderDao.Save(newOrder);

            // Save each product associated with the order
            foreach(ShoppingBasketItem item in shoppingBasketItems)
            {
                OrderProducts op = new OrderProducts(item)
                {
                    OrderId = createdOrder.Id
                };
                daoManager?.OrderProductsDao.Save(op);
            }

            return Ok($"Succesfully created a new order for {shoppingBasketItems.Count} products.");
        }

    }
}