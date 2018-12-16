import { combineReducers } from 'redux';

import { registration } from './registration.reducer';
import { authentication } from './authentication.reducer';
import { users, editUser } from './users.reducer';
import { products, product } from './product.reducer';
import { alert } from './alert.reducer';
import { shoppingCart } from './shoppingCart.reducer';
import { order } from './order.reducer'
import { orderProducts } from './orderProducts.reducer'
import { address } from './address.reducer'

const rootReducer = combineReducers({
    registration,
    authentication,
    users,
    editUser,
    products,
    product,
    alert,
    shoppingCart,
    order,
    orderProducts,
    address
});

export default rootReducer;