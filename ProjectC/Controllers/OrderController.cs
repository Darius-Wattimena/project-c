using Microsoft.AspNetCore.Mvc;
using ProjectC.Database.Entities;
using System;
using System.Collections.Generic;
using ProjectC.Database.Daos;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Linq;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using ProjectC.Database.SQL;

namespace ProjectC.Controllers
{
    [Authorize(Roles = "Admin,User")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderController : DaoController<OrderDao, Order>
    {
        public OrderController(ILogger<OrderController> logger) : base(logger)
        {

        }

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
                return BadRequest("No items to order.");
            }

            // Obtain user id
            if (!(HttpContext.User.Identity is ClaimsIdentity identity)) return BadRequest("User not found");
            var userId = int.Parse(identity.FindFirst(ClaimTypes.Sid).Value);

            double totalPrice = 0.0; // Is used for calculating the sum of the price of each product

            foreach(ShoppingBasketItem item in shoppingBasketItems)
            {
                // Retrieve associated product
                Product product = GetDaoManager().ProductDao.Find(item.ProductId);
                
                // Make sure each product is in stock
                if (product.Stock <= 0)
                {
                    return BadRequest($"Could not process order. The product '{product.Name}' is not in stock!");
                }

                // Product is in stock, add price to total
                totalPrice += product.Price * item.Amount;
            }

            // Create a new order
            var newOrder = new Order
            {
                OrderDate = DateTime.Now,
                TotalPrice = totalPrice,
                OrderState = 0,
                UserId = userId,
                
                // TODO: Store submitted coupon code
                CouponCodeId = null
            };

            // Create the order (insert new record into database)
            var createdOrder = GetDaoManager().OrderDao.Save(newOrder);

            // Add each product that is associated with the order
            foreach (ShoppingBasketItem item in shoppingBasketItems)
            {
                var op = OrderProducts.CreateOrderProduct(item, createdOrder.GetId());
                GetDaoManager().OrderProductsDao.Save(op);
            }

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
        public IActionResult GetPendingOrders()
        {
            var dao = GetDao();
            return Ok(dao.GetPendingOrders());
        }

        [HttpPut("{id}")]
        public IActionResult SetOrderAsConfirmed(int id)
        {
            var dao = GetDao();
            dao.SetOrderStateAndSave(id, Order.OrderStatusConfirmed);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult SetOrderAsSend(int id)
        {
            var dao = GetDao();
            dao.SetOrderStateAndSave(id, Order.OrderStatusSend);
            return Ok();
        }

        [HttpGet]
        public IActionResult GetByUser()
        {
            try
            {
                if (!(HttpContext.User.Identity is ClaimsIdentity identity)) return BadRequest("User not found");

                var userId = int.Parse(identity.FindFirst(ClaimTypes.Sid).Value);
                var ui = userId.ToString();
                return InnerSearch("UserId", ui);
            }
            catch (MySqlException ex)
            {
                return LogError(ex);
            }
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