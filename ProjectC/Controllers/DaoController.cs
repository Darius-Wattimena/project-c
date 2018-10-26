using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using ProjectC.Database.Core;
using ProjectC.Database.Core.Interfaces;
using ProjectC.Database.Daos;

namespace ProjectC.Controllers
{
    public abstract class DaoController<T, TU> : ControllerBase, IDaoController<TU> 
        where T : Dao<TU>
        where TU : IEntity
    {
        private readonly IActionResult _noDaoFound = new BadRequestObjectResult("Dao not found! Check the DaoManager class.");

        protected T Dao;

        private T FindDao()
        {
            if (Dao == null)
            {
                var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
                Dao = daoManager.FindDao<T, TU>(typeof(T).Name);
            }
            
            return Dao;
        }

        private IActionResult ExecuteFunction(Delegate method, params object[] args)
        {
            var result = method.DynamicInvoke(args);
            return Ok(result);
        }

        protected IActionResult InnerGet()
        {
            var dao = FindDao();
            return dao == null 
                ? _noDaoFound 
                : ExecuteFunction(new Func<List<TU>>(dao.FindAll));
        }

        protected IActionResult InnerGet(int id)
        {
            var dao = FindDao();
            return dao == null 
                ? _noDaoFound 
                : ExecuteFunction(new Func<int, TU>(dao.Find), id);
        }

        protected IActionResult InnerSearch(string field, string input)
        {
            var dao = FindDao();
            return dao == null
                ? _noDaoFound
                : ExecuteFunction(new Func<string, string, List<TU>>(dao.Search), field, input);
        }

        protected IActionResult InnerSave(TU entity)
        {
            var dao = FindDao();
            return dao == null 
                ? _noDaoFound 
                : ExecuteFunction(new Func<TU, TU>(dao.Save), entity);
        }
        
        protected IActionResult InnerDelete(int id)
        {
            var dao = FindDao();
            return dao == null 
                ? _noDaoFound 
                : ExecuteFunction(new Action<int>(dao.Delete), id);
        }

        public abstract IActionResult Get();
        public abstract IActionResult Get(int id);
        public abstract IActionResult Search(string field, string input);
        public abstract IActionResult Create(TU input);
        public abstract IActionResult Update(int id, TU input);
        public abstract IActionResult Delete(int id);
    }
}
