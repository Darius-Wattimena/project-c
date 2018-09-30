﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using ProjectC.Database.Core;
using ProjectC.Model;

namespace ProjectC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        // GET: api/Product
        [HttpGet]
        public string Get()
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            var products = daoManager?.ProductDao.FindAll();
            var json = JsonConvert.SerializeObject(products);
            return json;
        }

        [HttpPost]
        public void Add([FromBody] ProductAddModel product)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            //daoManager?.ProductDao.Save(product);
        }

    }
}
