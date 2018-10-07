using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Entities
{
    [Entity("Product")]
    public class Product : IEntity
    {

        [Field("ProductId", Core.FieldType.Integer, Primary = true)]
        public int Id;

        [Field(Core.FieldType.Varchar, Size = 50)]
        public string Name;

        [Field(Core.FieldType.Integer)]
        public int Stock;

        [Field(Core.FieldType.Decimal)]
        public double Price;

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
