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
import { OrderPage } from '../OrderPage';
import { UserPage } from '../UserPage';
import { OrderHistory } from '../UserPage/OrderHistory';
import { ChangeAddress } from '../UserPage/ChangeAddress';
import { EditUserName } from '../UserPage/EditUserName';

import { AdminPanelHeader } from '../AdminPanelHeader';
import { AdminPanel } from '../AdminPanel';
import { AdminProducts } from '../AdminProducts';
import { AdminStock } from '../AdminStock';
import { AdminStatistics } from '../AdminStatistics';
import { AdminUsers } from '../AdminUsers';
import { AdminEditUser } from '../AdminUsers/EditUser';
import { AdminOrders } from '../AdminOrders';
import { AdminOrderManagement } from '../AdminOrderManagement';
import { AdminSales } from '../AdminSales';
import { AdminCoupons } from '../AdminCoupons';
import { AdminReviews } from '../AdminReviews';
import { AddProduct } from '../AdminProducts/AddProduct';
import { EditProduct } from '../AdminProducts/EditProduct';
import { EditUserPage } from '../EditUserPage';

import { ProductPage } from '../ProductPage';
import { WishlistPage } from '../WishlistPage';

import { ShoppingCart } from '../ShoppingCart/ShoppingCart';
import { AdminOrder } from '../AdminOrders/AdminOrder/AdminOrder';


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
                        <Route path="/" render={(props) => (!props.location.pathname.startsWith("/admin")) && <Header />} />
                        <Route path="/" render={(props) => (props.location.pathname.startsWith("/admin")) && <AdminPanelHeader />} />
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <div className="row admin-container">
                            <Route path="/admin" component={AdminPanel} />
                            <Route path="/admin/statistics" component={AdminStatistics} />
                            <Route path="/admin/stock" component={AdminStock} />
                            <Route path="/admin/product" component={AdminProducts} />
                            <Route path="/admin/editproduct/:id" component={EditProduct} />
                            <Route path="/admin/addproduct" component={AddProduct} />
                            <Route exact path="/admin/users" component={AdminUsers} />
                            <Route path="/admin/users/edit/:id" component={AdminEditUser} />
                            <Route exact path="/admin/ordermanagement" component={AdminOrderManagement} />
                            <Route path="/admin/orders" component={AdminOrders} />
                            <Route path="/admin/order/:orderid" component={AdminOrder} />
                            <Route path="/admin/sales" component={AdminSales} />
                            <Route path="/admin/coupons" component={AdminCoupons} />
                            <Route path="/admin/reviews" component={AdminReviews} />
                        </div>
                        <div className="container">
                            <PrivateRoute exact path="/" component={ProductPage} />
                            <Route path="/home" component={ProductPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Route exact path="/products" component={ProductPage} />
                            <Route path="/products/:nr" component={ProductPage} />
                            <Route path="/product/:id" component={SingleProductPage} />
                            <Route path="/user/edit/:id" component={EditUserPage} />
                            <Route path="/checkout" component={ShoppingCart} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/order" component={OrderPage} />
                            <Route path="/profile" component={UserPage} />
                            <Route path="/wishlist" component={WishlistPage} />
                            <Route path="/orderhistory" component={OrderHistory} />
                            <Route path="/orderhistory/:orderid" component={OrderHistory} />
                            <Route path="/changeaddress" component={ChangeAddress} />
                            <Route path="/changename/" component={EditUserName} />
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
