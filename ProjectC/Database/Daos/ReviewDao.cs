using ProjectC.Database.Core;
using ProjectC.Database.Entities;

namespace ProjectC.Database.Daos
{
    public class ReviewDao : Dao<Review>
    {
        public ReviewDao(DatabaseContext context, DaoManager manager) : base(context, manager)
        {

        }
    }
}
