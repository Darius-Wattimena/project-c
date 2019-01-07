using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using ProjectC.Model;
using System.Collections.Generic;

namespace ProjectC.Database.Daos
{
    public class ReviewDao : Dao<Review>
    {
        public ReviewDao(DatabaseContext context) : base(context)
        {

        }

        public List<ReviewDisplayModel> GetAllForProduct(int productId, int userId = -1) {

            List<Review> reviews = Find("ProductId", productId.ToString());

            var reviewDisplay = new List<ReviewDisplayModel>();

            foreach (Review r in reviews) {
                ReviewDisplayModel rdm = DisplayModelFromReview(r);
                rdm.CanEdit = (r.UserId == userId);
                reviewDisplay.Add(rdm);
            }

            return reviewDisplay;
        }

        /// <summary>
        /// Turns review into displayable model
        /// </summary>
        private ReviewDisplayModel DisplayModelFromReview(Review r) {

            User user = DaoManager.UserDao.Find(r.UserId);

            return new ReviewDisplayModel {
                Id = r.Id,
                ProductId = r.ProductId,
                Name = $"{user.Firstname} {user.Lastname}",
                Body = r.Body,
                Rating = r.Rating,
                Date = r.ReviewDate.ToShortDateString()
            };
        }
    }
}
