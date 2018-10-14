using ProjectC.Database.Core;
using ProjectC.Database.Entities;

namespace ProjectC.Database.Daos
{
    public class OrderProductsDao : Dao<OrderProducts>
    {
        public OrderProductsDao(DatabaseContext context, DaoManager manager) : base(context, manager)
        {

        }
    }
}