using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using ProjectC.Database.Core;
using ProjectC.Helper;
using ProjectC.Model;

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
        public IActionResult GetTotalProductsSold([FromQuery] DateTime s, [FromQuery] DateTime e)
        {
            e = e.AddDays(1);

            var data = GetDaoManager().OrderProductsDao.GetTotalSoldProductsForMinMaxDays(s, e);
            var resultData = FillMissingEmptyDaysForProductsSold(data, s, e);
            return Ok(resultData);
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

        //TODO ~NEEDS REWORK OR CLEANUP~
        public Dictionary<DateTime, Dictionary<string, int>> FillMissingEmptyDaysForProductsSold(List<ProductStatisticsModel> currentData, DateTime minDate, DateTime maxDate)
        {
            var totalDays = (maxDate - minDate).TotalDays;

            // Create a dictionary with all the different products we have in the statistics model and split the models
            var usedProductsDictionary = new Dictionary<int, List<ProductStatisticsModel>>();
            var usedProducts = new List<string>();
            foreach (var dataItem in currentData)
            {
                if (!usedProductsDictionary.ContainsKey(dataItem.ProductId))
                {
                    usedProductsDictionary.Add(dataItem.ProductId, new List<ProductStatisticsModel>());
                    usedProducts.Add(dataItem.ProductName);
                }
                usedProductsDictionary[dataItem.ProductId].Add(dataItem);
            }
            
            var resultData = new Dictionary<DateTime, Dictionary<string, int>>();

            //Check of we een statistics hebben voor elke dag voor elk product

            //Nodig voor de product naam
            var checkedProductI = 0;

            //Voor elk product
            foreach (var product in usedProductsDictionary)
            {
                //Voor elke dag zet empty items
                for (var i = 0; i < totalDays; i++)
                {
                    //Insert lege values voor elk item
                    var insertDay = minDate.AddDays(i);

                    //Check of onze resultData nog niet deze datum heeft
                    if (!resultData.ContainsKey(insertDay))
                    {
                        //Voeg een lege dictionary toe voor de producten
                        resultData.Add(insertDay, new Dictionary<string, int>());
                    }

                    //Voeg een lege item toe voor elke dag voor het gecheckde product
                    resultData[insertDay].Add(usedProducts[checkedProductI], 0);
                }

                //Verhoog zodat we de naam van de volgende product in de lijst kunnen krijgen
                checkedProductI++;

                //Vervang de amount van de bestaande waardes in de dictionary
                foreach (var productItems in product.Value)
                {
                    var usedDate = Convert.ToDateTime(productItems.name);
                    resultData[usedDate].Remove(productItems.ProductName);
                    resultData[usedDate].Add(productItems.ProductName, productItems.Amount);
                }
            }

            return resultData;
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
