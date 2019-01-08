using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProjectC.Database.Daos;
using ProjectC.Database.Entities;
using ProjectC.Helper;
using System;

namespace ProjectC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ReviewController : DaoController<ReviewDao, Review>
    {
        public ReviewController(ILogger<ReviewController> logger) : base(logger) {

        }

        [HttpGet("{productId}")]
        public IActionResult GetPermissions(int productId) {

            bool canPost = false;

            if (UserSession.IsAuthenticated(HttpContext)) {
                int userId = UserSession.GetUserId(HttpContext);

                var hasOrderedProduct = GetDaoManager().OrderProductsDao.UserHasBoughtProduct(userId, productId);
                var hasPlacedReview = GetDaoManager().ReviewDao.Count("UserId", userId.ToString()) > 0;

                canPost = (hasOrderedProduct && !hasPlacedReview);
            }

            return Ok(canPost);
        }

        /// <summary>
        /// Get all reviews
        /// </summary>
        [HttpGet("{productId}")]
        public IActionResult GetAllForProduct(int productId) {

            if (UserSession.IsAuthenticated(HttpContext)) {
                // If the user is authenticated (logged in) 
                // we need to pass the user id to check if reviews are their own (editable)
                return Ok(
                    GetDao().GetAllForProduct(productId, UserSession.GetUserId(HttpContext))
                );
            }

            return Ok(
                GetDao().GetAllForProduct(productId)
            );
        }

        [HttpGet, Authorize(Roles = "Admin")]
        public override IActionResult Get() {
            return Ok(GetDao().GetAllForAdmin());
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
        public override IActionResult Create([FromBody] Review input) {

            // Input rating ranges between 1-5, otherwise its a 5 star rating ☺
            if (input.Rating < 1 || input.Rating > 5)
                input.Rating = 5;

            input.SetId(0);

            input.UserId = UserSession.GetUserId(HttpContext);
            input.ReviewDate = DateTime.Now;

            return InnerSave(input);
        }

        [HttpPut("{id}")]
        public override IActionResult Update(int id, [FromBody] Review input) {
            return InnerSave(input, id);
        }

        [HttpDelete("{id}")]
        public override IActionResult Delete(int id) {

            if (UserSession.IsAuthenticated(HttpContext)) {

                // User must either be an admin or own the review to delete it
                if (UserSession.GetUserRole(HttpContext).Equals("Admin")
                    ||
                    GetDao().Find(id).UserId == UserSession.GetUserId(HttpContext)) {
                    return InnerDelete(id);
                }
            }

            return Unauthorized();
        }
    }
}
