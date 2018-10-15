import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { Header } from '../Header';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { RegisterPage } from '../RegisterPage';
import { LoginPage } from '../LoginPage';
import { SingleProductPage } from '../SingleProductPage';

import { AdminPanelHeader } from '../AdminPanelHeader';
import { AdminPanel } from '../AdminPanel';
import { AdminProducts } from '../AdminProducts';
import { AdminStatistics } from '../AdminStatistics';
import { AdminUsers } from '../AdminUsers';
import { AdminOrders } from '../AdminOrders';
import { AdminSales } from '../AdminSales';
import { AdminCoupons } from '../AdminCoupons';
import { AdminReviews } from '../AdminReviews';
import { AddProduct } from '../AdminProducts/AddProduct';
import { EditUserPage } from '../EditUserPage';

import { ProductPage } from '../ProductPage';

import { ShoppingCart } from '../ShoppingCart/ShoppingCart';


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
                <div>
                
                        <Router history={history}>
                    <div>
                        <Route path="/" render={(props) => (!props.location.pathname.startsWith("/adminpanel")) && <Header />} />
                        <Route path="/" render={(props) => (props.location.pathname.startsWith("/adminpanel")) && <AdminPanelHeader />} />
                        <Route path="/adminpanel" component={AdminPanel} />
                        <Route path="/adminpanel/statistics" component={AdminStatistics} />
                        <Route path="/adminpanel/product" component={AdminProducts} />
                        <Route path="/adminpanel/addproduct" component={AddProduct} />
                        <Route path="/adminpanel/users" component={AdminUsers} />
                        <Route path="/adminpanel/orders" component={AdminOrders} />
                        <Route path="/adminpanel/sales" component={AdminSales} />
                        <Route path="/adminpanel/coupons" component={AdminCoupons} />
                        <Route path="/adminpanel/reviews" component={AdminReviews} />

                                <div className="container">
                                    <div className="col-sm-8 col-sm-offset-2">
                                        {alert.message &&
                                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                                        }
                                        </div>
                                        <PrivateRoute exact path="/" component={HomePage} />
                                        <Route path="/home" component={HomePage} />
                                        <Route path="/register" component={RegisterPage} />
                                        <Route path="/products" component={ProductPage} />
                                        <Route path="/product/:id" component={SingleProductPage} />
                                        <Route path="/user/edit/:id" component={EditUserPage} />
                                        <Route path="/checkout" component={ShoppingCart} />
                                        <Route path="/login" component={LoginPage} />

                                </div>
                            </div>
                    </Router>
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
