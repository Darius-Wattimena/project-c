using System.Collections.Generic;
using ProjectC.Database.Core;
using ProjectC.Database.Entities;

namespace ProjectC.Database.Daos
{
    public class ProductDao : Dao<Product>
    {
        public ProductDao(DatabaseContext context, DaoManager manager) : base(context, manager)
        {

        }

        public List<Product> SearchProduct(string searchValue)
        {
            return Search("name", "%" + searchValue + "%");
        }
    }
}
