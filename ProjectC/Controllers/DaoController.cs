using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using ProjectC.Database.Core;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Controllers
{
    public abstract class DaoController<T, TU> : ControllerBase, IDaoController<TU> 
        where T : Dao<TU>
        where TU : IEntity
    {
        private T _dao;
        private DaoManager _daoManager;
        private readonly Helper.Logger<DaoController<T, TU>> _logger;

        protected DaoController(ILogger<DaoController<T, TU>> logger)
        {
            _logger = Helper.Logger<DaoController<T, TU>>.Get(logger);
        }

        protected IActionResult LogErrorNoDaoFound()
        {
            GetLogger().Error("{0} not found! Check the DaoManager class.", typeof(T).Name);
            return BadRequest();
        }

        protected IActionResult LogError(string message)
        {
            GetLogger().Error(message);
            return BadRequest();
        }

        protected IActionResult LogError(MySqlException ex)
        {
            GetLogger().Error("MySqlError {2} | {0} | Exception : {1}", ex.Message, ex.StackTrace, ex.SqlState);
            return BadRequest();
        }

        protected Helper.Logger<DaoController<T, TU>> GetLogger()
        {
            return _logger;
        } 

        protected DaoManager GetDaoManager()
        {
            return _daoManager ?? (_daoManager = HttpContext.RequestServices.GetService<DaoManager>());
        }

        protected T GetDao()
        {
            return _dao ?? (_dao = GetDaoManager().FindDao<T, TU>(typeof(T).Name));
        }

        protected IActionResult InnerGet()
        {
            try
            {
                GetDao();
                return _dao == null
                    ? LogErrorNoDaoFound()
                    : Ok(_dao.FindAll());
            }
            catch (MySqlException ex)
            {
                return LogError(ex);
            }
        }

        protected IActionResult InnerGet(int id)
        {
            try
            {
                GetDao();
                return _dao == null 
                    ? LogErrorNoDaoFound()
                    : Ok(_dao.Find(id));
            }
            catch (MySqlException ex)
            {
                return LogError(ex);
            }
        }

        protected IActionResult InnerSearch(string field, string input)
        {
            try
            {
                GetDao();
                return _dao == null
                    ? LogErrorNoDaoFound()
                    : Ok(_dao.Search(field, input));
            }
            catch (MySqlException ex)
            {
                return LogError(ex);
            }
        }
        
        protected IActionResult InnerSave(TU entity, int id = -1)
        {
            try
            {
                if (id != -1)
                {
                    entity.SetId(id);
                }

                GetDao();
                return _dao == null
                    ? LogErrorNoDaoFound()
                    : Ok(_dao.Save(entity));
            }
            catch (MySqlException ex)
            {
                return LogError(ex);
            }
        }
        
        protected IActionResult InnerDelete(int id)
        {
            try
            {
                GetDao();
                if (_dao == null)
                {
                    return LogErrorNoDaoFound();
                }

                if (_dao.CheckIfExists(id))
                {
                    _dao.Delete(id);
                    return Ok();
                }

                return BadRequest();
            }
            catch (MySqlException ex)
            {
                return LogError(ex);
            }
        }

        public abstract IActionResult Get();
        public abstract IActionResult Get(int id);
        public abstract IActionResult Search(string field, string input);
        public abstract IActionResult Create(TU input);
        public abstract IActionResult Update(int id, TU input);
        public abstract IActionResult Delete(int id);
    }
}
