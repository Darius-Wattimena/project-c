using ProjectC.Database.Core;
using ProjectC.Database.Entities;

namespace ProjectC.Database.Daos
{
    public class RoleDao : Dao<Role>
    {
        public RoleDao(DatabaseContext context, DaoManager manager) : base(context, manager)
        {

        }
    }
}
