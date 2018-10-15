using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Entities
{
    [Entity]
    public class CouponCodeProduct : IEntity
    {
        [Field("CouponCodeProductId", Primary = true)]
        public int Id;

        [Field] public int CouponCodeId;
        [Field] public int ProductId;

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
