using Microsoft.AspNetCore.Mvc;
using ProjectC.Database.Core.Interfaces;

namespace ProjectC.Controllers
{
    internal interface IDaoController<in T> where T : IEntity
    {
        IActionResult Get();
        IActionResult Get(int id);
        IActionResult Create([FromBody] T input);
        IActionResult Update(int id, [FromBody] T input);
        IActionResult Delete(int id);
    }
}
