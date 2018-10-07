using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using ProjectC.Database.Core;
using ProjectC.Database.Entities;
using ProjectC.Helper;
using ProjectC.Model;

namespace ProjectC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly AppSettings _appSettings;

        public ProductController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }
        // GET: api/Product
        [HttpGet]
        public IActionResult Get()
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            var products = daoManager?.ProductDao.FindAll();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            var product = daoManager?.ProductDao.Find(id);
            return Ok(product);
        }

        // POST: api/Product/Add
        [HttpPost]
        public IActionResult Add([FromBody] ProductAddModel addProduct)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();

            Product product = new Product(addProduct);

            daoManager?.ProductDao.Save(product);

            return Ok($"Succesfully added {product.Name} to the inventory.");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            daoManager?.ProductDao.Delete(id);
            return Ok();
        }

    }
}
