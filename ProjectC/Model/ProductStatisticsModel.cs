using System;
using ProjectC.Helper;

namespace ProjectC.Model
{
    public class ProductStatisticsModel : Statistics
    {
        public int ProductId;
        public string ProductName;
        public DateTime Date;
        public int Amount;

        public ProductStatisticsModel(string name, int uv, int pv = 0, int amt = 0) : base(name, uv, pv, amt)
        {

        }
    }
}
