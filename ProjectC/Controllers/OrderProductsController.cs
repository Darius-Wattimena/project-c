using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using ProjectC.Database.Core;
using ProjectC.Database.Daos;
using ProjectC.Database.Entities;


namespace ProjectC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderProductsController : DaoController<OrderProductsDao, OrderProducts>
    {
        public OrderProductsController(ILogger<OrderProductsController> logger) : base(logger)
        {

        }

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

        [HttpGet("{orderId}")]
        public IActionResult GetByOrderId(int orderId)
        {
            try
            {
                var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
                return Ok(daoManager.OrderProductsDao.GetOrderWithProductsById(orderId));
            }
            catch (MySqlException ex)
            {
                return LogError(ex);
            }
        }


        [HttpGet]
        public override IActionResult Search(string f, string i)
        {
            return InnerSearch(f, i);
        }

        [HttpPost]
        public override IActionResult Create([FromBody] OrderProducts input)
        {
            return InnerSave(input);
        }

        [HttpPut("{id}")]
        public override IActionResult Update(int id, [FromBody] OrderProducts input)
        {
            return InnerSave(input, id);
        }

        [HttpDelete("{id}")]
        public override IActionResult Delete(int id)
        {
            return InnerDelete(id);
        }
    }
}
