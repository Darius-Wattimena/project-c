import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { RegisterPage } from '../RegisterPage';
import { LoginPage } from '../LoginPage';
import { ProductPage } from '../ProductList';
import { SingleProductPage } from '../SingleProduct';

import { AdminPanel } from '../AdminPanel';
import { AdminProducts } from '../AdminProducts';
import { AddProduct } from '../AdminProducts/AddProduct';
import { EditUserPage } from '../EditUserPage';

import { ProductPage } from '../ProductPage';

class App extends Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/home" component={HomePage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/products" component={ProductPage} />
                                <Route path="/product/:id" component={SingleProductPage} />
                                <Route path="/adminpanel" component={AdminPanel} />
                                <Route path="/adminpanel/product" component={AdminProducts} />
                                <Route path="/adminpanel/addproduct" component={AddProduct} />
                                <Route exact path="/products" component={ProductPage} />
                                <Route path="/user/edit/:id" component={EditUserPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
