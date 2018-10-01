using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using ProjectC.Model;

namespace ProjectC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        // GET: api/Product
        [HttpGet]
        [Route("api/[controller]")]
        public string Get()
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            var products = daoManager?.ProductDao.FindAll();
            var json = JsonConvert.SerializeObject(products);
            return json;
        }
        
        // POST: api/Product/Add
        [HttpPost]
        public IActionResult Add([FromBody] ProductAddModel product)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();

            Product p = new Product
            {
                Name = product.Name,
                Price = product.Price
            };

            daoManager?.ProductDao.Save(p);

            return Ok("Succesfully added product");
        }

    }
}
