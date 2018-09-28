using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using ProjectC.Database.SQL;

namespace ProjectC.Database.Daos
{
    public class ProductDao : Dao<Product>
    {
        public ProductDao(DatabaseContext context) : base(context)
        {

        }
    }
}
