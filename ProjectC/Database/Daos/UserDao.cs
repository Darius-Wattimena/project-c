using MySql.Data.MySqlClient;
using ProjectC.Database.Core;
using ProjectC.Database.Entities;

namespace ProjectC.Database.Daos
{
    public class UserDao : Dao<User>
    {
        public UserDao(DatabaseContext context) : base(context)
        {

        }

        public bool SetActive(bool active, int id) {
            var sqlQuery = $@"UPDATE user
                                SET `ActiveYn` = { (active ? 1 : 0) } WHERE `UserId` = {id}";

            using (var connection = new MySqlConnection(Database.Context.ConnectionString)) {
                connection.Open();
                using (var command = new MySqlCommand(sqlQuery, connection)) {
                    int affectedRows = command.ExecuteNonQuery();
                    connection.Close();
                    return affectedRows == 1;
                }
            }
        }

        public User FindUserByMailAddress(string email) {
            var users = Find("MailAddress", email);
            return users.Count > 0 ? users[0] : null;
        }
    }
}