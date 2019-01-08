using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using ProjectC.Database.Core;
using ProjectC.Database.Daos;
using ProjectC.Database.Entities;
using ProjectC.Model;
using System.Collections.Generic;
using System.Linq;

namespace ProjectC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : DaoController<ProductDao, Product>
    {
        public ProductController(ILogger<ProductController> logger) : base(logger)
        {

        }

        [HttpGet]
        public override IActionResult Get()
        {
            return GetAllWithSpecifications();
        }

        /// <summary>
        /// Get All products for admins (also inactive products)
        /// </summary>
        [HttpGet, Authorize(Roles = "Admin")]
        public IActionResult GetAdmin() {
            var products = GetDao().FindAllWithSpecifications();
            return Ok(products);
        }

        [HttpGet("{value}")]
        public IActionResult CustomSearch(string value)
        {
            if (value == null)
            {
                value = string.Empty;
            }

            try
            {
                var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
                var products = daoManager.ProductDao.SearchProduct(value);

                // Filter out inactive products!
                products.RemoveAll(p => p.Active == 0);

                var allSpecifications = GetDaoManager().SpecificationDao.FindAll();

                foreach (var item in products)
                {
                    item.Specifications = allSpecifications.Where(s => s.ProductId.Equals(item.Id)).ToList();
                }

                return Ok(products);
            }
            catch (MySqlException ex)
            {
                return LogError(ex);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetWithSpecifications(int id)
        {
            try
            {
                var dao = GetDao();
                return dao == null
                    ? LogErrorNoDaoFound()
                    : Ok(dao.FindWithSpecifications(id));
            }
            catch (MySqlException ex)
            {
                return LogError(ex);
            }
        }

        [HttpGet]
        public IActionResult GetAllWithoutSpecifications()
        {
            var products = GetDao().FindAll();
            products.RemoveAll(p => p.Active == 0);
            return Ok(products);
        }

        [HttpGet]
        public IActionResult GetAllWithSpecifications()
        {
            try
            {
                var dao = GetDao();

                var products = dao.FindAllWithSpecifications();

                // Filter out inactive products!
                products.RemoveAll(p => p.Active == 0);

                return Ok(products);
            }
            catch (MySqlException ex)
            {
                return LogError(ex);
            }
        }

        [HttpGet("{id}")]
        public override IActionResult Get(int id)
        {
            return InnerGet(id);
        }

        [HttpGet]
        public override IActionResult Search(string f, string i)
        {
            var products = GetDao().Search(f, i);

            products.RemoveAll(p => p.Active == 0);

            return Ok(products);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult CreateWithSpecifications([FromBody] ProductSpecificationsModel model)
        {
            try
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
            catch (MySqlException ex)
            {
                return LogError(ex);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public IActionResult UpdateWithSpecifications([FromBody] ProductSpecificationsModel model) {
            var dao = GetDao();
            var specificationDao = GetDaoManager().SpecificationDao;
            var databaseProduct = dao.Save(model.Product);

            foreach (var specification in model.Specifications) {
                specificationDao.Save(specification);
            }
            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public IActionResult ChangeStock([FromBody]ProductChangeStockModel model)
        {
            try
            {
                if (model.NewStock < 0)
                {
                    return BadRequest("The new stock must be bigger then -1");
                }

                if (!(model.Product == null || model.Product.Id == 0))
                {
                    var dao = GetDao();

                    if (dao.CheckIfExists(model.Product.Id))
                    {
                        var product = model.Product;
                        product.Stock = model.NewStock;
                        dao.Save(product);
                        return Ok();
                    }
                }

                return BadRequest("Product not found");
            }
            catch (MySqlException ex)
            {
                return LogError(ex);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public override IActionResult Create([FromBody] Product input)
        {
            input.Active = 1;
            return InnerSave(input);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public override IActionResult Update(int id, [FromBody] Product input)
        {
            input.Active = 1;
            return InnerSave(input, id);
        }

        // Recover deleted product
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public IActionResult Recover(int id) {
            if (GetDao().SetActive(true, id)) {
                return Ok("Product recovered.");
            }
            return BadRequest("Could not recover product");
        }

        // TODO ~needs rework
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public override IActionResult Delete(int id)
        {
            if (GetDao().SetActive(false, id)) {
                return Ok("Product deleted.");
            }

            return BadRequest("Could not delete product");

            //try
            //{
            //    var specDao = GetDaoManager().SpecificationDao;
            //    var specs = specDao.FindSpecificationsByProductId(id);
            //    specDao.Delete(specs);
            //
            //    //TODO delete orders related to the product
            //
            //    GetDao().Delete(id);
            //
            //    return Ok();
            //
            //    //return InnerDelete(id);
            //}
            //catch (MySqlException ex)
            //{
            //    return LogError(ex);
            //}
        }
    }
}
