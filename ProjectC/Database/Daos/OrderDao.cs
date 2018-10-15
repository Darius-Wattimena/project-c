using ProjectC.Database.Core;
using ProjectC.Database.Entities;

namespace ProjectC.Database.Daos
{
    public class OrderDao : Dao<Order>
    {
        public OrderDao(DatabaseContext context, DaoManager manager) : base(context, manager)
        {

        }
    }
}