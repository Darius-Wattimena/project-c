import { combineReducers } from 'redux';

import { registration } from './registration.reducer';
import { authentication } from './authentication.reducer';
import { users, editUser } from './users.reducer';
import { products, product } from './product.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    registration,
    authentication,
    users,
    editUser,
    products,
    product,
    alert
});

export default rootReducer;