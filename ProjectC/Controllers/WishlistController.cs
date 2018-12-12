using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProjectC.Database.Daos;
using ProjectC.Database.Entities;
using System;
using System.Security.Claims;

namespace ProjectC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class WishlistController : DaoController<WishlistDao, Wishlist>
    {
        public WishlistController(ILogger<WishlistController> logger) : base(logger)
        {

        }

        [HttpGet]
        public IActionResult GetWishlistItems(int wishlistId)
        {
            // Get user id
            if (HttpContext.User.Identity is ClaimsIdentity identity)
            {
                int userId = int.Parse(identity.FindFirst(ClaimTypes.Sid).Value);

                //items.ForEach(item =>
                //{
                //    // Store corresponding product inside the item
                //    item.Product = GetDaoManager().ProductDao.Find(item.ProductId);
                //});

                //return Ok(items);
            }
            else
            {
                return LogError("Couldn't find the users identity.");
            }

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
            return InnerSave(input);
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
