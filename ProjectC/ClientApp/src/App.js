import React, { Component } from 'react';
import { Route } from 'react-router';

import productPage from './components/productPage';
import singleProduct from './components/singleProduct';
import loginPage from './components/loginPage';
import adminPanel from './components/adminPanel';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <Route exact path="/products" component={productPage} />
                <Route path="/product/" component={singleProduct} />
                <Route path="/login" component={loginPage}/>
                <Route exact path="/adminpanel" component={adminPanel} />
            </div>
        );
    }
}
