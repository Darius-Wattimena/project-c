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
using Microsoft.AspNetCore.Mvc;
using ProjectC.Database.Daos;
using ProjectC.Database.Entities;

namespace ProjectC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderController : DaoController<OrderDao, Order>
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
            foreach (ShoppingBasketItem item in shoppingBasketItems)
            {
                OrderProducts op = new OrderProducts(item)
                {
                    OrderId = createdOrder.Id
                };
                daoManager?.OrderProductsDao.Save(op);
            }

            return Ok($"Succesfully created a new order for {shoppingBasketItems.Count} products.");
        }

        public override IActionResult Create(Order input)
        {
            throw new NotImplementedException();
        }

        public override IActionResult Delete(int id)
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        public override IActionResult Get()

        {
            return InnerGet();
        }

        [HttpGet("{id}")]
        public override IActionResult Get(int id)
        {
            throw new NotImplementedException();
        }

        public override IActionResult Search(string field, string input)
        {
            throw new NotImplementedException();
        }

        public override IActionResult Update(int id, Order input)
        {
            throw new NotImplementedException();
        }
    }
}