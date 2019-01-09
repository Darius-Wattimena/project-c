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

        [HttpPost, Authorize(Roles = "Admin, User")]
        public override IActionResult Create([FromBody] Review input) {

            if (!UserSession.GetUserRole(HttpContext).Equals("Admin")) {
                int userId = UserSession.GetUserId(HttpContext);
                var opDao = GetDaoManager().OrderProductsDao;
                bool hasBoughtProduct = opDao.UserHasBoughtProduct(userId, input.ProductId);

                // Check if user is allowed to post a review (must have bought the product before)
                if (!hasBoughtProduct) {
                    return BadRequest("You may not post a review for a product not yet bought.");
                }
                // Users may not post multiple reviews in order to prevent spamming
                if (GetDao().Count("ProductId", input.ProductId.ToString()) > 0) {
                    return BadRequest("You may only place a single review on this product.");
                }
            }

            // Input rating ranges between 1-5, otherwise its a 5 star rating (in our favor ☺)
            if (input.Rating < 1 || input.Rating > 5)
                input.Rating = 5;

            input.SetId(0);

            input.UserId = UserSession.GetUserId(HttpContext);
            input.ReviewDate = DateTime.Now;

            return InnerSave(input);
        }

        [HttpPut("{id}"), Authorize(Roles = "Admin, User")]
        public override IActionResult Update(int id, [FromBody] Review input) {

            if (input.UserId != UserSession.GetUserId(HttpContext)) {
                // We will not allow users changing other users' reviews (except admins)
                if (!UserSession.GetUserRole(HttpContext).Equals("Admin")) {
                    return BadRequest("You are not allowed to edit this review. ☻");
                }
            }

            // Input rating ranges between 1-5, otherwise its a 5 star rating (in our favor ☺)
            if (input.Rating < 1 || input.Rating > 5)
                input.Rating = 5;

            input.ReviewDate = DateTime.Now; // Set date to now

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
