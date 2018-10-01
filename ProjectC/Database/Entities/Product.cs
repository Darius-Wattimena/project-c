﻿using ProjectC.Database.Core.Annotations;
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
            Price = p.Price;
            ImageURL = p.ImageURL;
        }

        [Field("ProductId", Core.Type.Integer, Primary = true)]
        public int Id;

        [Field(Core.Type.Varchar, Size = 45)]
        public string Name;

        [Field(Core.Type.Integer, Size = 11)]
        public int Stock;

        [Field(Core.Type.Decimal)]
        public double Price;

        [Field(Core.Type.Varchar, Size = 256)]
        public string ImageURL;

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
