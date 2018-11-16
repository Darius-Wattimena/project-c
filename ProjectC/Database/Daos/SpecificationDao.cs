using System.Collections.Generic;
using ProjectC.Database.Core;
using ProjectC.Database.Entities;

namespace ProjectC.Database.Daos
{
    public class SpecificationDao : Dao<Specification>
    {
        public SpecificationDao(DatabaseContext context, DaoManager manager) : base(context, manager)
        {

        }

        public List<Specification> FindSpecificationsByProductId(int id)
        {
            return Find("productId", id.ToString());
        }
    }
}