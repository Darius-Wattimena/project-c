using System.Data;
using ProjectC.Database.Daos;

namespace ProjectC.Database.Core
{
    public class DaoManager
    {
        private static DaoManager _instance;
        private static DatabaseContext _context;
        
        public UserDao UserDao;
        public ProductDao ProductDao;

        public static DaoManager Get(DatabaseContext context)
        {
            if (_instance == null)  {
                _instance = new DaoManager();
                _context = context;

                _instance.RegisterDaos();
            }

            return _instance;
        }

        private DaoManager()
        {

        }

        private void RegisterDaos()
        {
            UserDao = new UserDao(_context);
            ProductDao = new ProductDao(_context);
        }
    }
}