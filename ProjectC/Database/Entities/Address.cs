using ProjectC.Database.Core.Annotations;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Entities
{
    [Entity]
    public class Address : IEntity
    {
        [Field("AddressId", Primary = true)]
        public int Id;

        [Field] public string Country;
        [Field] public string County;
        [Field] public string City;
        [Field] public string Street;
        [Field] public string StreetNumber;
        [Field] public string StreetSupplement;
        [Field] public string Zipcode;

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
