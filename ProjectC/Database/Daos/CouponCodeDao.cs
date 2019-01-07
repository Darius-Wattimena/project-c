using ProjectC.Database.Core;
using ProjectC.Database.Entities;

namespace ProjectC.Database.Daos
{
    public class CouponCodeDao : Dao<CouponCode>
    {
        public CouponCodeDao(DatabaseContext context) : base(context)
        {

        }
    }
}