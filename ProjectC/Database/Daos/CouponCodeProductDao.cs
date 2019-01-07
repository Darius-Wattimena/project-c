using ProjectC.Database.Core;
using ProjectC.Database.Entities;

namespace ProjectC.Database.Daos
{
    public class CouponCodeProductDao : Dao<CouponCodeProduct>
    {
        public CouponCodeProductDao(DatabaseContext context) : base(context)
        {

        }
    }
}