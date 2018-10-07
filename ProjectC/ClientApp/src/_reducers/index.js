import { combineReducers } from 'redux';

import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { products } from './product.reducer';
import { product } from './product.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    registration,
    users,
    products,
    product,
    alert
});

export default rootReducer;