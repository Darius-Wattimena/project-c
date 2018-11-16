﻿using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using ProjectC.Database.Core;
using ProjectC.Database.Daos;
using ProjectC.Database.Entities;
using ProjectC.Model;

namespace ProjectC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : DaoController<ProductDao, Product>
    {
        [HttpGet]
        public override IActionResult Get()
        {
            return InnerGet();
        }

        [HttpGet("{value}")]
        public IActionResult CustomSearch(string value)
        {
            if (value == null)
            {
                value = string.Empty;
            }

            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            List<Product> products = daoManager.ProductDao.SearchProduct(value);
            return Ok(products);
        }

        [HttpGet("{id}")]
        public IActionResult GetWithSpecifications(int id)
        {
            var dao = GetDao();
            return dao == null
                ? NoDaoFound
                : ExecuteFunction(new Func<int, Product>(dao.FindWithSpecifications), id);
        }

        [HttpGet]
        public IActionResult GetAllWithSpecifications()
        {
            var dao = GetDao();
            return dao == null
                ? NoDaoFound
                : ExecuteFunction(new Func<List<Product>>(dao.FindAllWithSpecifications));
        }

        [HttpGet("{id}")]
        public override IActionResult Get(int id)
        {
            return InnerGet(id);
        }

        [HttpGet]
        public override IActionResult Search(string f, string i)
        {
            return InnerSearch(f, i);
        }

        [HttpPost]
        public IActionResult CreateWithSpecifications([FromBody] ProductSpecificationsModel model)
        {
            var dao = GetDao();
            var specificationDao = GetDaoManager().SpecificationDao;
            var databaseProduct = dao.Save(model.Product);
            foreach (var specification in model.Specifications)
            {
                specification.ProductId = databaseProduct.Id;
                specificationDao.Save(specification);
            }

            return Ok();
        }

        [HttpPost]
        public override IActionResult Create([FromBody] Product input)
        {
            return InnerSave(input);
        }

        [HttpPut("{id}")]
        public override IActionResult Update(int id, [FromBody] Product input)
        {
            return InnerSave(input, id);
        }

        [HttpDelete("{id}")]
        public override IActionResult Delete(int id)
        {
            var specDao = GetDaoManager().SpecificationDao;
            var specs = specDao.FindSpecificationsByProductId(id);
            specDao.Delete(specs);
            
            //TODO delete orders related to the product

            GetDao().Delete(id);

            return Ok();

            //return InnerDelete(id);
        }
    }
}
