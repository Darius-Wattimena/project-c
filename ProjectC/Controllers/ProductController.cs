﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using ProjectC.Model;
using System.Net;
using System.Net.Http;

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
        
        // POST: api/Product
        [HttpPost]
        public HttpResponseMessage Add([FromBody] ProductAddModel product)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();

            Product p = new Product
            {
                Name = product.Name,
                Price = product.Price
            };

            daoManager?.ProductDao.Save(p);

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

    }
}
