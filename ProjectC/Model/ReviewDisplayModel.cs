using ProjectC.Database.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectC.Model
{
    public class ReviewDisplayModel
    {
        /// <summary>
        /// ID
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Product ID
        /// </summary>
        public int ProductId { get; set; }

        /// <summary>
        /// Username of the user the review was posted by
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// The review itself
        /// </summary>
        public string Body { get; set; }

        /// <summary>
        /// Star rating
        /// </summary>
        public int Rating { get; set; }

        public string Date { get; set; }

        public bool CanEdit { get; set; }

        public string ProductName { get; set; }
    }
}
