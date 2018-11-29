using System.Collections.Generic;
using MySql.Data.MySqlClient;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Core
{
    public class Database
    {
        private static Database _instance;
        private readonly DatabaseContext _context;

        public static Database Get(DatabaseContext context)
        {
            return _instance ?? (_instance = new Database(context));
        }

        private Database(DatabaseContext context)
        {
            _context = context;
        }

        public List<T> ExecuteQuery<T, TU>(TU dao, string query) 
            where T : IEntity
            where TU : Dao<T>
        {
            using (var connection = new MySqlConnection(_context.ConnectionString))
            {
                connection.Open();
                using (var command = new MySqlCommand(query, connection))
                {
                    using (var reader = command.ExecuteReader())
                    {
                        var values = dao.ProcessDataReader(reader);
                        connection.Close();
                        return values;
                    }
                }
            }
        }

        public int ExecuteCountQuery<T, TU>(TU dao, string query)
            where T : IEntity
            where TU : Dao<T>
        {
            using (var connection = new MySqlConnection(_context.ConnectionString))
            {
                connection.Open();
                using (var command = new MySqlCommand(query, connection))
                {
                    using (var reader = command.ExecuteReader())
                    {
                        var result = 0;
                        while (reader.Read())
                        {
                            result = reader.GetInt32(0);
                        }
                        connection.Close();
                        return result;
                    }
                }
            }
        }

        public bool ExecuteExistsQuery<T, TU>(TU dao, string query)
            where T : IEntity
            where TU : Dao<T>
        {
            using (var connection = new MySqlConnection(_context.ConnectionString))
            {
                connection.Open();
                using (var command = new MySqlCommand(query, connection))
                {
                    using (var reader = command.ExecuteReader())
                    {
                        var result = false;
                        while (reader.Read())
                        {
                            result = reader.GetBoolean(0);
                        }
                        connection.Close();
                        return result;
                    }
                }
            }
        }

        public void ExecuteNoResultQuery<T, TU>(TU dao, string query)
            where T : IEntity
            where TU : Dao<T>
        {
            using (var connection = new MySqlConnection(_context.ConnectionString))
            {
                connection.Open();
                using (var command = new MySqlCommand(query, connection))
                {
                    command.ExecuteNonQuery();
                    connection.Close();
                }
            }
        }
    }
}