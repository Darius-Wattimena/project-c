﻿using System;
using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Entities
{
    [Entity]
    public class Order : IEntity
    {
        [Field("OrderId", Primary = true)]
        public int Id;

        [Field] public string TotalPrice;
        [Field] public int OrderState;
        [Field] public DateTime OrderDate;
        [Field] public int UserId;
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