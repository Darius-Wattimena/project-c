using ProjectC.Database.Core;
using ProjectC.Database.Entities;

namespace ProjectC.Database.Daos
{
    public class SpecificationDao : Dao<Specification>
    {
        public SpecificationDao(DatabaseContext context, DaoManager manager) : base(context, manager)
        {

        }
    }
}