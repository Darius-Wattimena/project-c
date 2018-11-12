using System;
using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Entities
{
    [Entity]
    public class Order : IEntity
    {
        public Order()
        {

        }

        [Field("OrderId", Primary = true)]
        public int Id;

        [Field] public double TotalPrice;
        [Field] public int OrderState;
        [Field] public DateTime? OrderDate;
        [Field] public int UserId;
        [Field] public int? CouponCodeId;

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
