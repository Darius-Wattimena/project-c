using ProjectC.Database.Core.Interfaces;
using ProjectC.Database.Daos;

namespace ProjectC.Database.Core
{
    /// <summary>
    /// The DaoManger class is a central point where all the Dao classes are registered and can be accessed in every Dao object 
    /// without needing to initialize a Dao object multiple times
    /// </summary>
    public class DaoManager
    {
        private static DaoManager _instance;
        private static DatabaseContext _context;

        public AddressDao AddressDao;
        public CouponCodeDao CouponCodeDao;
        public CouponCodeProductDao CouponCodeProductDao;
        public OrderDao OrderDao;
        public OrderProductsDao OrderProductsDao;
        public ProductDao ProductDao;
        public ReviewDao ReviewDao;
        public RoleDao RoleDao;
        public ShoppingBasketDao ShoppingBasketDao;
        public ShoppingBasketItemDao ShoppingBasketItemDao;
        public SpecificationDao SpecificationDao;
        public UserDao UserDao;
        public WishlistDao WishlistDao;
        public WishlistItemDao WishlistItemDao;

        /// <summary>
        /// Singleton pattern to get the DaoManger class
        /// </summary>
        /// <param name="context">A DatabaseContext object containing the connection string</param>
        /// <returns>An instance of the DaoManger class</returns>
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

        /// <summary>
        /// Method to receive the instance of an Dao object using the name of the needed dao
        /// </summary>
        /// <typeparam name="T">A dao object that extends the base dao class with T as his entity type</typeparam>
        /// <typeparam name="TU">An entity object that implements the IEntity interface</typeparam>
        /// <param name="key">The name of the dao</param>
        /// <returns>The found dao object or null when not found</returns>
        public T FindDao<T, TU>(string key) 
            where T : Dao<TU> 
            where TU : IEntity
        {
            switch (key)
            {
                case "AddressDao":
                    return AddressDao as T;
                case "CouponCodeDao":
                    return CouponCodeDao as T;
                case "CouponCodeProductDao":
                    return CouponCodeProductDao as T;
                case "OrderDao":
                    return OrderDao as T;
                case "OrderProductsDao":
                    return OrderProductsDao as T;
                case "ProductDao":
                    return ProductDao as T;
                case "ReviewDao":
                    return ReviewDao as T;
                case "RoleDao":
                    return RoleDao as T;
                case "ShoppingBasketDao":
                    return ShoppingBasketDao as T;
                case "ShoppingBasketItemDao":
                    return ShoppingBasketItemDao as T;
                case "SpecificationDao":
                    return SpecificationDao as T;
                case "UserDao":
                    return UserDao as T;
                case "WishlistDao":
                    return WishlistDao as T;
                case "WishlistItemDao":
                    return WishlistItemDao as T;
                default:
                    return null;
            }
        }

        /// <summary>
        /// Initialize all the daos
        /// </summary>
        private void RegisterDaos()
        {
            AddressDao = new AddressDao(_context);
            CouponCodeDao = new CouponCodeDao(_context);
            CouponCodeProductDao = new CouponCodeProductDao(_context);
            OrderDao = new OrderDao(_context);
            OrderProductsDao = new OrderProductsDao(_context);
            ProductDao = new ProductDao(_context);
            ReviewDao = new ReviewDao(_context);
            RoleDao = new RoleDao(_context);
            ShoppingBasketDao = new ShoppingBasketDao(_context);
            ShoppingBasketItemDao = new ShoppingBasketItemDao(_context);
            SpecificationDao = new SpecificationDao(_context);
            UserDao = new UserDao(_context);
            WishlistDao = new WishlistDao(_context);
            WishlistItemDao = new WishlistItemDao(_context);
        }
    }
}