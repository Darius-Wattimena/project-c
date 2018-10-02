using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Entities
{
    [Entity("Product")]
    public class Product : IEntity
    {

        [Field("ProductId", Core.Type.Integer, Primary = true)]
        public int Id;

        [Field(Core.Type.Varchar, Size = 50)]
        public string Name;

        [Field(Core.Type.Integer)]
        public int Stock;

        [Field(Core.Type.Decimal)]
        public double Price;

        [Field(Core.Type.Varchar, Size = 256)]
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
