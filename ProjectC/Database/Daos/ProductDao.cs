using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using ProjectC.Database.SQL;
using System.Collections.Generic;

namespace ProjectC.Database.Daos
{
    public class ProductDao : Dao<Product>
    {
        public ProductDao(DatabaseContext context, DaoManager manager) : base(context, manager)
        {
            
        }

        public List<Product> Search(string Searchstring) {
            string product = ("SELECT * FROM product WHERE Name LIKE '%" + Searchstring + "%' ");
            return Execute(product);
        }
    }
}


