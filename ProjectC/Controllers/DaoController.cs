using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using ProjectC.Database.Core;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Controllers
{
    public abstract class DaoController<T, TU> : ControllerBase, IDaoController<TU> 
        where T : Dao<TU>
        where TU : IEntity
    {
        protected readonly IActionResult NoDaoFound = new BadRequestObjectResult("Dao not found! Check the DaoManager class.");

        private T _dao;
        private DaoManager _daoManager;

        protected DaoManager GetDaoManager()
        {
            return _daoManager ?? (_daoManager = HttpContext.RequestServices.GetService<DaoManager>());
        }

        protected T GetDao()
        {
            return _dao ?? (_dao = GetDaoManager().FindDao<T, TU>(typeof(T).Name));
        }

        protected IActionResult ExecuteFunction(Delegate method, params object[] args)
        {
            var result = method.DynamicInvoke(args);
            return Ok(result);
        }

        protected IActionResult InnerGet()
        {
            GetDao();
            return _dao == null 
                ? NoDaoFound 
                : ExecuteFunction(new Func<List<TU>>(_dao.FindAll));
        }

        protected IActionResult InnerGet(int id)
        {
            GetDao();
            return _dao == null 
                ? NoDaoFound 
                : ExecuteFunction(new Func<int, TU>(_dao.Find), id);
        }

        protected IActionResult InnerSearch(string field, string input)
        {
            GetDao();
            return _dao == null
                ? NoDaoFound
                : ExecuteFunction(new Func<string, string, List<TU>>(_dao.Search), field, input);
        }
        
        protected IActionResult InnerSave(TU entity, int id = -1)
        {
            if (id != -1)
            {
                entity.SetId(id);
            }

            GetDao();
            return _dao == null 
                ? NoDaoFound 
                : ExecuteFunction(new Func<TU, TU>(_dao.Save), entity);
        }

        //TODO needs check if ID exists
        protected IActionResult InnerDelete(int id)
        {
            GetDao();
            return _dao == null 
                ? NoDaoFound 
                : ExecuteFunction(new Action<int>(_dao.Delete), id);
        }

        public abstract IActionResult Get();
        public abstract IActionResult Get(int id);
        public abstract IActionResult Search(string field, string input);
        public abstract IActionResult Create(TU input);
        public abstract IActionResult Update(int id, TU input);
        public abstract IActionResult Delete(int id);
    }
}
