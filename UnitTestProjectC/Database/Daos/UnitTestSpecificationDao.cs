using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjectC.Database.Core;
using ProjectC.Database.Daos;
using ProjectC.Model;
using System.Collections.Generic;
using ProjectC.Database.Entities;

namespace UnitTestProjectC.Database.Daos
{
    [TestClass]
    public class UnitTestSpecificationDao
    {
        private static readonly DaoManager DaoManager = DaoManager.Get(UnitTestDatabaseContext.Get());
        private static readonly SpecificationDao SpecificationDao = DaoManager.SpecificationDao;

        [TestMethod]
        public void FindSpecificationsByProductId_GivenAProductId_ReturningAListOfTypeSpecification()
        {
            var specifications = SpecificationDao.FindSpecificationsByProductId(4);
            Assert.IsInstanceOfType(specifications, typeof(List<Specification>));
        }

        [TestMethod]
        public void FindSpecificationsByProductId_GivenAProductId_ReturningAListWhereCountIsBiggerThen0()
        {
            var specifications = SpecificationDao.FindSpecificationsByProductId(4);
            bool isBiggerThen0 = specifications.Count > 0;
            Assert.IsTrue(isBiggerThen0);
        }

        [TestMethod]
        public void FindSpecificationsByProductId_GivenANotExistingProductId_ReturningAListWhereCountIs0()
        {
            var specifications = SpecificationDao.FindSpecificationsByProductId(0);
            bool isEmpty = specifications.Count == 0;
            Assert.IsTrue(isEmpty);
        }
    }
}
