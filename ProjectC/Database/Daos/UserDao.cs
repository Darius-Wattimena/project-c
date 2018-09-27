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

        public bool DoesUserExist(string username)
        {
            var sqlBuilder = new SqlBuilder<User>(TableConfig);
            sqlBuilder.AddParameter("Username", username);

            var query = sqlBuilder.Build(QueryType.SelectCount);
            var totalUsers = ExecuteCount(query);
            
            return totalUsers > 0;
        }
    }
}