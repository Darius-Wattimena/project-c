using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProjectC.Database.Daos;
using ProjectC.Database.Entities;
using ProjectC.Helper;

namespace ProjectC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class WishlistItemController : DaoController<WishlistItemDao, WishlistItem>
    {
        public WishlistItemController(ILogger<WishlistItemController> logger) : base(logger)
        {

        }

        [HttpPost]
        public override IActionResult Create([FromBody] WishlistItem input) {
            int userId = UserSession.GetUserId(HttpContext);

            // Check if product exists
            if (!GetDaoManager().ProductDao.CheckIfExists(input.ProductId)) {
                return BadRequest("Invalid product");
            }
            // Wishlist exists
            else if (!GetDaoManager().WishlistDao.CheckIfExists(input.WishlistId)) {
                return BadRequest("Wishlist does not exist");
            }
            // User must own wishlist
            else if (!GetDaoManager().WishlistDao.IsOwnedByUser(userId, input.WishlistId)) {
                return BadRequest("User does not own wishlist.");
            }

            input.SetId(0);

            return InnerSave(input);
        }

        [HttpDelete("{id}")]
        public override IActionResult Delete(int id) {
            return InnerDelete(id);
        }

        #region dontneedthis
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

        [HttpPut("{id}")]
        public override IActionResult Update(int id, [FromBody] WishlistItem input)
        {
            return InnerSave(input, id);
        }
        #endregion
    }
}
