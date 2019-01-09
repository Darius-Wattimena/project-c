using System;
using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Entities
{
    [Entity]
    public class Order : IEntity
    {
        public static readonly int OrderStatusPending = 0;
        public static readonly int OrderStatusConfirmed = 1;
        public static readonly int OrderStatusSend = 2;

        const int ORDERNUMBER_START = 100000;

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

        public string DateFormat =>
            OrderDate.HasValue
            ?
            string.Format("{0:dddd, MMMM d, yyyy HH:mm}", OrderDate)
            :
            string.Empty;

        public int OrderNumber => (Id + ORDERNUMBER_START);

        public static int OrderNumberToId(int orderNumber) {
            return orderNumber - ORDERNUMBER_START;
        }

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
