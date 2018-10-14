using ProjectC.Database.Core;
using ProjectC.Database.Entities;

namespace ProjectC.Database.Daos
{
    public class UserDao : Dao<User>
    {
        public UserDao(DatabaseContext context, DaoManager manager) : base(context, manager)
        {

        }

        public User FindUserByMailAddress(string email)
        {
            var users = Find("MailAddress", email);
            return users.Count > 0 ? users[0] : null;
        }
    }
}