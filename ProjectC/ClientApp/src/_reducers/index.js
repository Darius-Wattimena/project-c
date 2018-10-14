import { combineReducers } from 'redux';

import { registration } from './registration.reducer';
import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { products } from './product.reducer';
import { product } from './product.reducer';
import { alert } from './alert.reducer';
import { shoppingCart } from './shoppingCart.reducer'

const rootReducer = combineReducers({
    registration,
    authentication,
    users,
    products,
    product,
    alert,
    shoppingCart
});

export default rootReducer;