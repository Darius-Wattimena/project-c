using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using ProjectC.Database.Core;
using ProjectC.Database.Daos;
using ProjectC.Database.Entities;
using ProjectC.Model;
using System.Collections.Generic;

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

        [HttpGet("{id}")]
        public override IActionResult Get(int id)
        {
            return InnerGet(id);
        }

        [HttpPost]
        public override IActionResult Create([FromBody] Product input)
        {
            return InnerSave(input);
        }

        [HttpPut("{id}")]
        public override IActionResult Update(int id, [FromBody] Product input)
        {
            return InnerSave(input);
        }

        [HttpDelete("{id}")]
        public override IActionResult Delete(int id)
        {
            return InnerDelete(id);
        }

        [HttpGet("{value}")]
        public IActionResult Search(string value)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            List<Product> products = daoManager.ProductDao.Search(value);
            return Ok(products);
        }
    }
}
