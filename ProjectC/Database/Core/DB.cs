using System.Data;
using MySql.Data.MySqlClient;

namespace ProjectC.Database.Core
{
    public class DB
    {
        private static DB _instance;
        private readonly MySqlConnection _connection;
        private readonly DatabaseContext _context;

        public static DB Get(DatabaseContext context)
        {
            return _instance ?? (_instance = new DB(context));
        }

        private DB(DatabaseContext context)
        {
            _connection = new MySqlConnection(context.ConnectionString);
            _context = context;
        }

        public void OpenConnection()
        {
            if (_connection.State == ConnectionState.Closed)
            {
                _connection.Open();
            }
        }

        public void CloseConnection()
        {
            if (_connection.State == ConnectionState.Open)
            {
                _connection.Close();
            }
        }

        public bool TestConnection()
        {
            MySqlConnection testConnection = null;
            try
            {
                testConnection = new MySqlConnection(_context.ConnectionString);
                testConnection.Open();
                testConnection.Close();
                return true;
            }
            catch (MySqlException)
            {
                return false;
            }
            finally
            {
                testConnection?.Close();
            }
        }

        public MySqlConnection GetConnection()
        {
            return _connection;
        }
    }
}