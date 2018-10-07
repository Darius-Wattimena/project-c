using ProjectC.Database.Core;
using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;
using ProjectC.Model;

namespace ProjectC.Database.Entities
{
    [Entity("Product")]
    public class Product : IEntity
    {
        public Product()
        {

        }

        public Product(ProductAddModel p)
        {
            Name = p.Name;
            Stock = p.Stock;
            Price = p.Price;
            ImageUrl = p.ImageURL;
        }

        [Field("ProductId", FieldType.Integer, Primary = true)]
        public int Id;

        [Field(FieldType.Varchar, Size = 45)]
        public string Name;

        [Field(FieldType.Integer, Size = 11)]
        public int Stock;

        [Field(FieldType.Decimal)]
        public double Price;

        [Field(FieldType.Varchar, Size = 256)]
        public string ImageUrl;

        public int GetId()
        {
            return Id;
        }

        public void SetId(int id)
        {
            this.Id = id;
        }
    }
}
