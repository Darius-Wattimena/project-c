using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProjectC.Database.Daos;
using ProjectC.Database.Entities;

namespace ProjectC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SpecificationController : DaoController<SpecificationDao, Specification>
    {
        public SpecificationController(ILogger<SpecificationController> logger) : base(logger)
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

        [HttpGet]
        public IActionResult GetByProduct(int pid)
        {
            var dao = GetDao();
            return dao == null
                ? LogErrorNoDaoFound()
                : Ok(dao.FindSpecificationsByProductId(pid));
        }

        [HttpGet]
        public override IActionResult Search(string f, string i)
        {
            return InnerSearch(f, i);
        }

        [HttpPost("{id}")]
        public IActionResult CreateSpecificationsForProduct(int id, [FromBody] List<Specification> specifications)
        {
            var dao = GetDao();
            return dao == null
                ? LogErrorNoDaoFound()
                : Ok(dao.Save(specifications));
        }


        [HttpPost]
        public override IActionResult Create([FromBody] Specification input)
        {
            return InnerSave(input);
        }

        [HttpPut("{id}")]
        public override IActionResult Update(int id, [FromBody] Specification input)
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
