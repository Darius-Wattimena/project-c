using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
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
        public ProductController(ILogger<ProductController> logger) : base(logger)
        {

        }

        [HttpGet]
        public override IActionResult Get()
        {
            return GetAllWithSpecifications();
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

                foreach (var item in products)
                {
                    item.Specifications = GetDaoManager().SpecificationDao.FindSpecificationsByProductId(item.Id);
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
            return Ok(GetDao().FindAll());
        }

        [HttpGet]
        public IActionResult GetAllWithSpecifications()
        {
            try
            {
                var dao = GetDao();
                return dao == null
                    ? LogErrorNoDaoFound()
                    : Ok(dao.FindAllWithSpecifications());
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
            return InnerSearch(f, i);
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
            return InnerSave(input);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public override IActionResult Update(int id, [FromBody] Product input)
        {
            return InnerSave(input, id);
        }

        // TODO ~needs rework
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public override IActionResult Delete(int id)
        {
            try
            {
                var specDao = GetDaoManager().SpecificationDao;
                var specs = specDao.FindSpecificationsByProductId(id);
                specDao.Delete(specs);

                //TODO delete orders related to the product

                GetDao().Delete(id);

                return Ok();

                //return InnerDelete(id);
            }
            catch (MySqlException ex)
            {
                return LogError(ex);
            }
        }
    }
}
