using System;
using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Entities
{
    [Entity]
    public class CouponCode : IEntity
    {
        [Field("CouponCodeId", Primary = true)]
        public int Id;

        [Field] public string Code;
        [Field] public double Discount;
        [Field] public DateTime ExpirationDate;

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
