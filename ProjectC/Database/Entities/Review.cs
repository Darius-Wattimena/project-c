using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;
using System;

namespace ProjectC.Database.Entities
{
    [Entity]
    public class Review : IEntity
    {
        [Field("ReviewId", Primary = true)]
        public int Id;

        [Field] public string Body;
        [Field] public int Rating;
        [Field] public int UserId;
        [Field] public int ProductId;
        [Field] public DateTime ReviewDate;

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
