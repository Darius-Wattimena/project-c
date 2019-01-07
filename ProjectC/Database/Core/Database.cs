using System;
using System.Collections.Generic;
using System.Data;
using MySql.Data.MySqlClient;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Database.Core
{
    /// <summary>
    /// The Database class where we execute all the queries and process the DataReaders
    /// This class is a singleton and can only be called using the Get method while providing the database context
    /// </summary>
    public class Database
    {
        private static Database _instance;
        public readonly DatabaseContext Context;

        /// <summary>
        /// Singleton pattern to get the database class
        /// </summary>
        /// <param name="context">A DatabaseContext object containing the connection string</param>
        /// <returns>An instance of the database class</returns>
        public static Database Get(DatabaseContext context)
        {
            return _instance ?? (_instance = new Database(context));
        }

        private Database(DatabaseContext context)
        {
            Context = context;
        }
        
        /// <summary>
        /// Intern method used by most database query execute methods
        /// 
        /// In this method we:
        /// - create a new connection
        /// - open the connection
        /// - execute the query
        /// - process the result with a given action
        /// </summary>
        /// <typeparam name="T">A type this can be anything that you want to return. (e. g. int or a custom entity like User)</typeparam>
        /// <param name="query">The given sql query</param>
        /// <param name="action">The action that needs to be executed when reading the DataReader</param>
        /// <returns>A list of values with type T</returns>
        private List<T> InternExecuteQuery<T>(string query, Action<IDataReader, List<T>> action)
        {
            using (var connection = new MySqlConnection(Context.ConnectionString))
            {
                connection.Open();
                using (var command = new MySqlCommand(query, connection))
                {
                    using (var reader = command.ExecuteReader())
                    {
                        var results = new List<T>();

                        while (reader.Read())
                        {
                            action.Invoke(reader, results);
                        }
                        connection.Close();
                        return results;
                    }
                }
            }
        }

        /// <summary>
        /// Execute a custom query while giving a custom method to fill the result values
        /// </summary>
        /// <typeparam name="T">A type this can be anything that you want to return. (e. g. int or a custom entity like User)</typeparam>
        /// <param name="query">The given sql query</param>
        /// <param name="action">The action that needs to be executed when reading the DataReader</param>
        /// <returns>A list of values with type T</returns>
        public List<T> ExecuteCustomQuery<T>(string query, Action<IDataReader, List<T>> action)
        {
            return InternExecuteQuery(query, action);
        }
        
        /// <summary>
        /// Execute a query using a dao object and a query
        /// After receiving a reader from the database the dao object will handle the result
        /// This will return a list with results of the type T (the entity object of a Dao)
        /// </summary>
        /// <typeparam name="T">An entity object that implements the IEntity interface</typeparam>
        /// <typeparam name="TU">A dao object that extends the base dao class with T as his entity type</typeparam>
        /// <param name="dao">An instance of the dao object needed to handle the result</param>
        /// <param name="query">The given sql query</param>
        /// <returns>A list of values with type T</returns>
        public List<T> ExecuteQuery<T, TU>(TU dao, string query) 
            where T : IEntity
            where TU : Dao<T>
        {
            using (var connection = new MySqlConnection(Context.ConnectionString))
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
        
        /// <summary>
        /// Execute a count query returning an integer
        /// </summary>
        /// <typeparam name="T">An entity object that implements the IEntity interface</typeparam>
        /// <typeparam name="TU">A dao object that extends the base dao class with T as his entity type</typeparam>
        /// <param name="dao">An instance of the dao object</param>
        /// <param name="query">The given sql query</param>
        /// <returns>An integer value of the count query result</returns>
        public int ExecuteCountQuery<T, TU>(TU dao, string query)
            where T : IEntity
            where TU : Dao<T>
        {
            var result = 0;
            InternExecuteQuery<int>(query, (reader, resultList) =>
            {
                result = reader.GetInt32(0);
            });
            return result;
        }

        /// <summary>
        /// Execute a count query that has multiple results and returns a list of integers
        /// </summary>
        /// <typeparam name="T">An entity object that implements the IEntity interface</typeparam>
        /// <typeparam name="TU">A dao object that extends the base dao class with T as his entity type</typeparam>
        /// <param name="dao">An instance of the dao object</param>
        /// <param name="query">The given sql query</param>
        /// <returns>A list of multiple count results</returns>
        public List<int> ExecuteMultiResultCountQuery<T, TU>(TU dao, string query)
            where T : IEntity
            where TU : Dao<T>
        {
            return InternExecuteQuery<int>(query, (reader, results) =>
            {
                var result = reader.GetInt32(0);
                results.Add(result);
            });
        }
        
        /// <summary>
        /// Execute an EXISTS query returning a boolean value
        /// </summary>
        /// <typeparam name="T">An entity object that implements the IEntity interface</typeparam>
        /// <typeparam name="TU">A dao object that extends the base dao class with T as his entity type</typeparam>
        /// <param name="dao">An instance of the dao object</param>
        /// <param name="query">The given sql query</param>
        /// <returns>true if the exists query returns true otherwise false</returns>
        public bool ExecuteExistsQuery<T, TU>(TU dao, string query)
            where T : IEntity
            where TU : Dao<T>
        {
            var result = false;
            InternExecuteQuery<bool>(query, (reader, resultList) =>
            {
                result = reader.GetBoolean(0);
            });
            return result;
        }
        
        /// <summary>
        /// Executes a query with no result
        /// </summary>
        /// <typeparam name="T">An entity object that implements the IEntity interface</typeparam>
        /// <typeparam name="TU">A dao object that extends the base dao class with T as his entity type</typeparam>
        /// <param name="dao">An instance of the dao object</param>
        /// <param name="query">The given sql query</param>
        public void ExecuteNoResultQuery<T, TU>(TU dao, string query)
            where T : IEntity
            where TU : Dao<T>
        {
            using (var connection = new MySqlConnection(Context.ConnectionString))
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