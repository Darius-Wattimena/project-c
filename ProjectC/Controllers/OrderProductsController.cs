﻿using Microsoft.AspNetCore.Mvc;
using ProjectC.Database.Daos;
using ProjectC.Database.Entities;

namespace ProjectC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderProductsController : DaoController<OrderProductsDao, OrderProducts>
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
        public override IActionResult Create([FromBody] OrderProducts input)
        {
            return InnerSave(input);
        }

        [HttpPut("{id}")]
        public override IActionResult Update(int id, [FromBody] OrderProducts input)
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
