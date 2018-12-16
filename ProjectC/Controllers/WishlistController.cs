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
        public WishlistController(ILogger<WishlistController> logger) : base(logger) {

        }

        [HttpGet]
        public IActionResult GetMyWishlists() {
            int userId = UserSession.GetUserId(HttpContext);
            return Ok(GetDao().Find("UserId", userId.ToString()));
        }

        [HttpGet("{wishlistId}")]
        public IActionResult GetItems(int wishlistId) {
            int userId = UserSession.GetUserId(HttpContext);

            // Ensure user owns wishlist
            if (!GetDao().IsOwnedByUser(userId, wishlistId)) {
                return BadRequest($"The current user ({userId}) does not own that wishlist ({wishlistId})!");
            }

            var items = GetDaoManager().WishlistItemDao.GetWishlistItems(wishlistId);

            items.ForEach(item => {
                // store corresponding product inside the item
                item.Product = GetDaoManager().ProductDao.Find(item.ProductId);
            });

            return Ok(items);
        }

        [HttpGet]
        public override IActionResult Get() {
            return InnerGet();
        }

        [HttpGet("{id}")]
        public override IActionResult Get(int id) {
            return InnerGet(id);
        }

        [HttpGet]
        public override IActionResult Search(string f, string i) {
            return InnerSearch(f, i);
        }

        [HttpPost]
        public override IActionResult Create([FromBody] Wishlist input) {
            // Make sure id is not set (0)
            input.SetId(0);

            // Set user id
            int userId = UserSession.GetUserId(HttpContext);

            input.UserId = userId;

            // Make sure user doesn't exceed wishlist creation limit
            if (GetDao().Count("UserId", input.UserId.ToString()) >= Wishlist.MAX_WISHLISTS) {
                return BadRequest($"You may not create more than {Wishlist.MAX_WISHLISTS} wishlists!");
            }

            if (string.IsNullOrEmpty(input.Name)) {
                // Default name is 'WishlistX' where X is the 1-based wishlist count number
                int amount = GetDao().Count("UserId", userId.ToString());
                input.Name = $"Wishlist{amount + 1}";
            }

            return InnerSave(input); // Performs an insert
        }

        [HttpPut("{id}")]
        public override IActionResult Update(int id, [FromBody] Wishlist input) {
            return InnerSave(input, id);
        }

        [HttpDelete("{id}")]
        public override IActionResult Delete(int id) {
            int userId = UserSession.GetUserId(HttpContext);

            if (GetDao().IsOwnedByUser(userId, id)) {
                return InnerDelete(id);
            }

            return BadRequest($"This wishlist cannot be deleted by the user. (user id: {userId}, " +
                $"wishlist id: {id})");
        }
    }
}
