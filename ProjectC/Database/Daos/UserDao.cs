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

        public User FindUserByEmail(string email)
        {
            var users = Find("MailAddress", email);
            return users.Count > 0 ? users[0] : null;
        }
    }
}