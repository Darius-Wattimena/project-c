using System.Collections.Generic;
using System.Data;
using ProjectC.Database.Core.Interfaces;
using ProjectC.Database.Daos;

namespace ProjectC.Database.Core
{
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

        public T FindDao<T, U>(string key) 
            where T : Dao<U> 
            where U : IEntity
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

        private void RegisterDaos()
        {
            AddressDao = new AddressDao(_context, this);
            CouponCodeDao = new CouponCodeDao(_context, this);
            CouponCodeProductDao = new CouponCodeProductDao(_context, this);
            OrderDao = new OrderDao(_context, this);
            OrderProductsDao = new OrderProductsDao(_context, this);
            ProductDao = new ProductDao(_context, this);
            ReviewDao = new ReviewDao(_context, this);
            RoleDao = new RoleDao(_context, this);
            ShoppingBasketDao = new ShoppingBasketDao(_context, this);
            ShoppingBasketItemDao = new ShoppingBasketItemDao(_context, this);
            SpecificationDao = new SpecificationDao(_context, this);
            UserDao = new UserDao(_context, this);
            WishlistDao = new WishlistDao(_context, this);
            WishlistItemDao = new WishlistItemDao(_context, this);
        }
    }
}