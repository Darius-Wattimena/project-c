using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProjectC.Database.Daos;
using ProjectC.Database.Entities;
using ProjectC.Helper;
using System;
using System.Security.Claims;

namespace ProjectC.Controllers
{
    [Authorize(Roles = "User, Admin")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class WishlistController : DaoController<WishlistDao, Wishlist>
    {
        public WishlistController(ILogger<WishlistController> logger) : base(logger)
        {

        }

        [HttpGet("{id}")]
        public IActionResult GetItems(int wishlistId)
        {
            int userId = UserSession.GetUserId(HttpContext);

            var items = GetDaoManager().WishlistItemDao.GetWishlistItems(userId, wishlistId);

            items.ForEach(item =>
            {
                // store corresponding product inside the item
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
        public override IActionResult Create([FromBody] Wishlist input)
        {
            // Make sure id is not set (0)
            input.SetId(0);

            // Set user id
            input.UserId = UserSession.GetUserId(HttpContext);

            return InnerSave(input); // Perform insert
        }

        [HttpPut("{id}")]
        public override IActionResult Update(int id, [FromBody] Wishlist input)
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
