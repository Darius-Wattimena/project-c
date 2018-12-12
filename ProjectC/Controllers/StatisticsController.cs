using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using ProjectC.Database.Core;
using ProjectC.Helper;

namespace ProjectC.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        public StatisticsController(ILogger<StatisticsController> logger)
        {
            
        }

        public DaoManager GetDaoManager()
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            return daoManager;
        }

        [HttpGet]
        public IActionResult GetSevenLastOrdersCount()
        {
            var today = DateTime.Today.AddDays(1);
            var sevenDaysAgo = today.AddDays(-7);

            var data = GetDaoManager().OrderDao.GetTotalOrdersForLastSevenDays(sevenDaysAgo, today);
            var resultData = new List<Statistics>();

            var dataI = 0;
            for (int i = 0; i < 7; i++)
            {
                var checkedDay = sevenDaysAgo.AddDays(i);

                if (data.Count < dataI + 1)
                {
                    resultData.Add(new Statistics(checkedDay.ToString("yyyy-MM-dd"), 0));
                    continue;
                }
                
                var dataListDay = Convert.ToDateTime(data[dataI].name);
                if (checkedDay.Equals(dataListDay))
                {
                    resultData.Add(data[dataI]);
                    dataI++;
                }
                else
                {
                    resultData.Add(new Statistics(checkedDay.ToString("yyyy-MM-dd"), 0));
                }
            }

            return Ok(resultData);
        }

        [HttpGet]
        public IActionResult GetTotalUsers()
        {
            var totalUsers = GetDaoManager().UserDao.CountAll();
            return Ok(totalUsers);
        }

        [HttpGet]
        public IActionResult GetTotalProductsSold()
        {
            var data = GetDaoManager().OrderProductsDao.GetTotalProductsSold();
            return Ok(data);
        }
    }
}
