using System.Collections.Generic;
using MySql.Data.MySqlClient;
using ProjectC.Database.Core;
using ProjectC.Database.Entities;

namespace ProjectC.Database.Daos
{
    public class ProductDao : Dao<Product>
    {
        public ProductDao(DatabaseContext context, DaoManager manager) : base(context, manager)
        {
            
        }

        public Product FindWithSpecifications(int id)
        {
            var product = Find(id);
            var specifications = DaoManager.SpecificationDao.FindSpecificationsByProductId(product.Id);
            product.Specifications = specifications;
            return product;
        }

        public bool SetActive(bool active, int id) {
            var sqlQuery = $@"UPDATE product
                                SET `ActiveYn` = { (active ? 1 : 0) } WHERE `ProductId` = {id}";

            using (var connection = new MySqlConnection(Database.Context.ConnectionString)) {
                connection.Open();
                using (var command = new MySqlCommand(sqlQuery, connection)) {
                    int affectedRows = command.ExecuteNonQuery();
                    connection.Close();
                    return affectedRows == 1;
                }
            }
        }

        public List<Product> FindAllWithSpecifications()
        {
            var products = FindAll();

            foreach (var product in products)
            {
                var specifications = DaoManager.SpecificationDao.FindSpecificationsByProductId(product.Id);
                product.Specifications = specifications;
            }

            return products;
        }

        public List<Product> SearchProduct(string searchValue)
        {
            return Search("name", "%" + searchValue + "%"); // is het zelfde als "SELECT * FROM product WHERE name LIKE '%" + searchValue + "%'"
        }

        public Product FindById(int id)
        {
            return Find(id);
        }
    }
}


