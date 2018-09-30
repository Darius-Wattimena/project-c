import { combineReducers } from 'redux';

import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    registration,
    users,
    alert
});

export default rootReducer;