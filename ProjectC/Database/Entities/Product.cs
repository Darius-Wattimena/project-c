using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;
using ProjectC.Model;

namespace ProjectC.Database.Entities
{
    [Entity]
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
            Description = p.Description;
        }

        [Field("ProductId", Primary = true)]
        public int Id;

        [Field] public string Name;
        [Field] public string Description;
        [Field] public double Price;
        [Field] public int Stock;
        [Field] public string ImageUrl;

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
