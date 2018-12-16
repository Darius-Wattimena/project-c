using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
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
        private const string DateTimeStringFormat = "yyyy-MM-dd";

        public StatisticsController(ILogger<StatisticsController> logger)
        {
            
        }

        public DaoManager GetDaoManager()
        {
            var daoManager = HttpContext.RequestServices.GetService<DaoManager>();
            return daoManager;
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

        [HttpGet]
        public IActionResult GetOrders([FromQuery] DateTime s, [FromQuery] DateTime e)
        {
            //TODO edit frontend for now add one day to the end date
            e = e.AddDays(1);

            var data = GetDaoManager().OrderDao.GetTotalOrdersForMinMaxDays(s, e);
            data = FillMissingEmptyDays(data, s, e);

            var resultData = new List<object>();
            foreach (var statistics in data)
            {
                resultData.Add(new
                {
                    statistics.name,
                    orders = statistics.uv
                });
            }

            return Ok(resultData);
        }

        [HttpGet]
        public IActionResult GetIncome([FromQuery] DateTime s, [FromQuery] DateTime e)
        {
            e = e.AddDays(1);

            var data = GetDaoManager().OrderDao.GetTotalIncomeForMinMaxDays(s, e);
            data = FillMissingEmptyDays(data, s, e);

            var resultData = new List<object>();
            foreach (var statistics in data)
            {
                resultData.Add(new
                {
                    statistics.name,
                    income = statistics.uv
                });
            }

            return Ok(resultData);
        }

        public List<Statistics> FillMissingEmptyDays(List<Statistics> currentData, DateTime minDate, DateTime maxDate)
        {
            var totalDays = (maxDate - minDate).TotalDays;
            var resultData = new List<Statistics>();
            var dataI = 0;
            for (var i = 0; i < totalDays; i++)
            {
                var checkedDay = minDate.AddDays(i);

                if (currentData.Count < dataI + 1)
                {
                    resultData.Add(new Statistics(checkedDay.ToString(DateTimeStringFormat), 0));
                    continue;
                }

                var dataListDay = Convert.ToDateTime(currentData[dataI].name);
                if (checkedDay.Equals(dataListDay))
                {
                    resultData.Add(currentData[dataI]);
                    dataI++;
                }
                else
                {
                    resultData.Add(new Statistics(checkedDay.ToString(DateTimeStringFormat), 0));
                }
            }

            return resultData;
        }
    }
}
