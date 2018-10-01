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
    }
}
