using ProjectC.Database.Core;
using ProjectC.Database.Entities;

namespace ProjectC.Database.Daos
{
    public class AddressDao : Dao<Address>
    {
        public AddressDao(DatabaseContext context) : base(context)
        {

        }
    }
}