using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using ProjectC.Database.SQL;

namespace ProjectC.Database.Daos
{
    public class UserDao : Dao<User>
    {
        public UserDao(DatabaseContext context) : base(context)
        {

        }

        public User FindUserByMailAddress(string mailaddress)
        {
            var users = Find("Mailaddress", mailaddress);
            return users.Count > 0 ? users[0] : null;
        }
    }
}