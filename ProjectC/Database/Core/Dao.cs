using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection;
using ProjectC.Database.Core.Interfaces;
using ProjectC.Database.SQL;

namespace ProjectC.Database.Core
{
    /// <summary>
    /// The Dao class is an Database Access Layer object that has build-in Table and Field 
    /// </summary>
    /// <typeparam name="T">An entity object that implements the IEntity interface</typeparam>
    public abstract class Dao<T> where T : IEntity
    {
        private const string LoggingSqlPrefix = "SQL Executing | ";

        protected readonly Database Database;
        protected readonly Type EntityType;
        protected FieldInfo[] Fields;
        protected readonly TableConfig<T> TableConfig;

        protected readonly DaoManager DaoManager;
        
        /// <summary>
        /// The constructor of a basic dao class
        /// Here we create the table config and all the field configs needed for the dao to functional properly
        /// </summary>
        /// <param name="context">A DatabaseContext object containing the connection string</param>
        protected Dao(DatabaseContext context)
        {
            DaoManager = DaoManager.Get(context);
            Database = Database.Get(context);
            EntityType = typeof(T);

            TableConfig = DatabaseUtil.CreateTableConfig<T>(EntityType);

            CreateFieldConfigs();
        }
        
        /// <summary>
        /// Create a field config object for all the fields in the entity with the FieldAttribute
        /// </summary>
        private void CreateFieldConfigs()
        {
            Fields = EntityType.GetFields(BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);
            foreach(var field in Fields)
            {
                var cfg = DatabaseUtil.CreateFieldConfig<T>(field);

                if (cfg == null)
                {
                    continue;
                }

                if (cfg.Primary)
                {
                    TableConfig.PrimaryFieldConfig = cfg;
                }
                TableConfig.Fields.Add(cfg.Name, cfg);
            }
        }

        /// <summary>
        /// Execute a query on the database object
        /// </summary>
        /// <param name="query">The given sql query</param>
        /// <returns>A list of entities</returns>
        protected List<T> Execute(string query)
        {
            Console.WriteLine(LoggingSqlPrefix + query);
            return Database.ExecuteQuery<T, Dao<T>>(this, query);
        }

        /// <summary>
        /// Execute a custom query on the database object
        /// </summary>
        /// <typeparam name="TC">A custom type this can be anything that you want to return. (e. g. int or a custom entity like User)</typeparam>
        /// <param name="query">The given sql query</param>
        /// <param name="action">The action that needs to be executed when reading the DataReader</param>
        /// <returns>A list of values with type TC</returns>
        protected List<TC> ExecuteCustom<TC>(string query, Action<IDataReader, List<TC>> action)
        {
            Console.WriteLine(LoggingSqlPrefix + query);
            return Database.ExecuteCustomQuery(query, action);
        }
        
        /// <summary>
        /// Execute a count query on the database object
        /// </summary>
        /// <param name="query">The given sql query</param>
        /// <returns>An integer value of the count query result</returns>
        protected int ExecuteCount(string query)
        {
            Console.WriteLine(LoggingSqlPrefix + query);
            return Database.ExecuteCountQuery<T, Dao<T>>(this, query);
        }
        
        /// <summary>
        /// Execute a count query with multiple results on the database object
        /// </summary>
        /// <param name="query">The given sql query</param>
        /// <returns>A list of multiple count results</returns>
        protected List<int> ExecuteMultiResultCount(string query)
        {
            Console.WriteLine(LoggingSqlPrefix + query);
            return Database.ExecuteMultiResultCountQuery<T, Dao<T>>(this, query);
        }
        
        /// <summary>
        /// Execute an exists query on the database object
        /// </summary>
        /// <param name="query">The given sql query</param>
        /// <returns>true if the exists query returns true otherwise false</returns>
        protected bool ExecuteExists(string query)
        {
            Console.WriteLine(LoggingSqlPrefix + query);
            return Database.ExecuteExistsQuery<T, Dao<T>>(this, query);
        }
        
        /// <summary>
        /// Execute a query on the database object without a result
        /// </summary>
        /// <param name="query">The given sql query</param>
        protected void ExecuteNoResult(string query)
        {
            Console.WriteLine(LoggingSqlPrefix + query);
            Database.ExecuteNoResultQuery<T, Dao<T>>(this, query);
        }
        
        /// <summary>
        /// Process the given DataReader using all the field configs of an entity and fill all the fields where the value isn't null
        /// </summary>
        /// <param name="dataReader">The received data reader after executing a query</param>
        /// <returns>A list of entities</returns>
        public List<T> ProcessDataReader(IDataReader dataReader)
        {
            var results = new List<T>();

            while(dataReader.Read())
            {
                var result = Activator.CreateInstance<T>();
                foreach (var fieldConfig in TableConfig.Fields.Values)
                {
                    var fieldValue = dataReader[fieldConfig.Name];
                    if (fieldValue.GetType() != typeof(DBNull))
                    {
                        fieldConfig.Field.SetValue(result, fieldValue);
                    }
                }
                results.Add(result);
            }
            return results;
        }

        /// <summary>
        /// Execute a query where you check if the given id exists in the database
        /// </summary>
        /// <param name="id">An integer value of the primary key</param>
        /// <returns>true if an entity with the given primary key exists in the database otherwise it returns false</returns>
        public bool CheckIfExists(int id)
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig)
            {
                Id = id
            };
            return ExecuteExists(sqlBuilder.Build(QueryType.SelectExists));
        }

        /// <summary>
        /// Execute a find query given a field and value
        /// This will execute a query returning all the rows where the given field is equal to the given value
        /// </summary>
        /// <param name="field">The column name</param>
        /// <param name="value">The given input</param>
        /// <returns>A list with objects of type T</returns>
        public List<T> Find(string field, string value)
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig);
            sqlBuilder.AddParameter(field, value);
            var query = sqlBuilder.Build(QueryType.Select);
            return Execute(query);
        }

        /// <summary>
        /// Execute a find query given a field and list of values
        /// This will execute a query returning all the rows where the given field is equal to on of the given values
        /// </summary>
        /// <param name="field">The column name</param>
        /// <param name="values">A list of given input</param>
        /// <returns>A list with objects of type T</returns>
        public List<T> FindByList(string field, List<string> values)
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig);
            sqlBuilder.AddParameters(field, values);
            var query = sqlBuilder.Build(QueryType.Select);
            return Execute(query);
        }

        /// <summary>
        /// Execute a find query given an entity id
        /// This will execute a query returning the first row where the Id field is equal to the given id
        /// </summary>
        /// <param name="id">An integer value of the primary key</param>
        /// <returns>The first item in the result of the query</returns>
        public T Find(int id)
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig)
            {
                Id = id
            };
            var query = sqlBuilder.Build(QueryType.Select);
            var result = Execute(query);
            return result[0];
        }

        /// <summary>
        /// Execute a find query given a dictionary with parameters
        /// This will execute a query returning all the rows where every column is equal to there given value
        /// </summary>
        /// <param name="parameters">A dictionary of parameters where every parameter contains of a key (the column name) and a value (the given input)</param>
        /// <returns>A list with objects of type T</returns>
        public List<T> Find(Dictionary<string, string> parameters)
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig);
            sqlBuilder.AddParameters(parameters);
            var query = sqlBuilder.Build(QueryType.Select);
            return Execute(query);
        }
        
        /// <summary>
        /// Execute a find query without a where statement returning all the value of a table
        /// </summary>
        /// <returns>A list with objects of type T</returns>
        public List<T> FindAll()
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig);
            var query = sqlBuilder.Build(QueryType.Select);
            return Execute(query);
        }

        /// <summary>
        /// Execute a search query given a field and an input
        /// This will execute a query returning all the rows where the given field is like the given value
        /// </summary>
        /// <param name="field">The column name</param>
        /// <param name="input">The given input</param>
        /// <returns>A list with objects of type T</returns>
        public List<T> Search(string field, string input)
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig);
            sqlBuilder.AddParameter(field, input, QueryPartType.Like);
            var query = sqlBuilder.Build(QueryType.Select);
            return Execute(query);
        }

        /// <summary>
        /// Execute a count query given an entity id
        /// This will execute a query returning a count where the entities primary key is equal to the given id
        /// </summary>
        /// <param name="id">An integer value of the primary key</param>
        /// <returns>A count of the total found results</returns>
        public int Count(int id)
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig)
            {
                Id = id
            };
            var query = sqlBuilder.Build(QueryType.SelectCount);
            return ExecuteCount(query);
        }

        /// <summary>
        /// Execute a count query given an field and a value
        /// This will execute a query counting all the rows where the given field is equal to the given value
        /// </summary>
        /// <param name="field">The column name</param>
        /// <param name="value">The given input</param>
        /// <returns>A count of the total found results</returns>
        public int Count(string field, string value)
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig);
            sqlBuilder.AddParameter(field, value);
            var query = sqlBuilder.Build(QueryType.SelectCount);
            return ExecuteCount(query);
        }

        /// <summary>
        /// Execute a count query without a where statement counting all the value of a table
        /// </summary>
        /// <returns>A count of the total found results</returns>
        public int CountAll()
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig);
            var query = sqlBuilder.Build(QueryType.SelectCount);
            return ExecuteCount(query);
        }

        /// <summary>
        /// Force create a new entity even when it already contains an id
        /// </summary>
        /// <param name="entity">The given object that needs to be saved</param>
        /// <returns>A saved entity with the given id</returns>
        public T Create(T entity)
        {
            entity.SetId(0);
            return Insert(entity);
        }

        /// <summary>
        /// Save all the entities in a list and call the <see cref="Save(T)">save method</see> for every entity in the list
        /// </summary>
        /// <param name="entities">A list of the given objects that need to be saved</param>
        /// <returns>A list of saved entities with the given id</returns>
        public List<T> Save(IEnumerable<T> entities)
        {
            var resultEntities = new List<T>();
            foreach (var entity in entities)
            {
                resultEntities.Add(Save(entity));
            }
            return resultEntities;
        }

        /// <summary>
        /// Save the given entity if the current id equals 0 insert it into the database otherwise update the already existing record
        /// </summary>
        /// <param name="entity">The given object that needs to be saved</param>
        /// <returns>A saved entity with the given id</returns>
        public T Save(T entity)
        {
            return entity.GetId() == 0 ? Insert(entity) : Update(entity);
        }

        /// <summary>
        /// Execute a delete query given an entity id
        /// This will execute a query that deletes all the records of a table where the primary key equals the given id
        /// </summary>
        /// <param name="id">An integer value of the primary key</param>
        public void Delete(int id)
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig)
            {
                Id = id
            };
            var query = sqlBuilder.Build(QueryType.Delete);
            ExecuteNoResult(query);
        }

        /// <summary>
        /// Execute a delete query given an entity object
        /// This will execute a query that deletes all the records of a table where the primary key equals the given entity's id
        /// </summary>
        /// <param name="entity">The given object that needs to be deleted</param>
        public void Delete(T entity)
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig, entity);
            var query = sqlBuilder.Build(QueryType.Delete);
            ExecuteNoResult(query);
        }

        /// <summary>
        /// Execute a delete query given an entity object
        /// This will execute a query that deletes all the records of a table where the primary key equals the ids of the given entities
        /// </summary>
        /// <param name="entities">A list of given object that need to be deleted</param>
        public void Delete(IEnumerable<T> entities)
        {
            foreach (var entity in entities)
            {
                Delete(entity);
            }
        }

        /// <summary>
        /// The insert method that is getting called at <see cref="Save(T)"/>
        /// </summary>
        /// <param name="entity">The given object that needs to be inserted</param>
        /// <returns>The inserted entity with the given id</returns>
        private T Insert(T entity)
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig, entity);
            var query = sqlBuilder.Build(QueryType.Insert);
            // Perform insert and select inserted id right away in the same connection
            var lastId = ExecuteCount($"{query}; SELECT LAST_INSERT_ID()");
            entity.SetId(lastId);
            return entity;
        }

        /// <summary>
        /// The insert method that is getting called at <see cref="Save(T)"/>
        /// </summary>
        /// <param name="entity">The given object that needs to be updated</param>
        /// <returns>The updated entity</returns>
        private T Update(T entity)
        {
            var sqlBuilder = new SqlBuilder<T>(TableConfig, entity);
            var query = sqlBuilder.Build(QueryType.Update);
            ExecuteNoResult(query);
            return entity;
        }
    }
}