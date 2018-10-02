using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DevOne.Security.Cryptography.BCrypt;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
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
        public IActionResult Add([FromBody] ProductAddModel product)
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();

            Product p = new Product
            {
                Name = product.Name,
                Stock = product.Stock,
                Price = product.Price,
                ImageUrl = product.ImageUrl
            };

            daoManager?.ProductDao.Save(p);

            return Ok("Succesfully added product");
        }

    }
}
