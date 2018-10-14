using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Entities
{
    public class OrderProducts : IEntity
    {
        [Field("OrderProductsId", Primary = true)]
        public int Id;

        [Field] public int Amount;
        [Field] public int ProductId;
        [Field] public int OrderId;

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
