using Microsoft.AspNetCore.Mvc;
using ProjectC.Database.Daos;
using ProjectC.Database.Entities;

namespace ProjectC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CouponCodeController : DaoController<CouponCodeDao, CouponCode>
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

        [HttpGet]
        public override IActionResult Search(string f, string i)
        {
            return InnerSearch(f, i);
        }

        [HttpPost]
        public override IActionResult Create([FromBody] CouponCode input)
        {
            return InnerSave(input);
        }

        [HttpPut("{id}")]
        public override IActionResult Update(int id, [FromBody] CouponCode input)
        {
            return InnerSave(input);
        }

        [HttpDelete("{id}")]
        public override IActionResult Delete(int id)
        {
            return InnerDelete(id);
        }
    }
}
