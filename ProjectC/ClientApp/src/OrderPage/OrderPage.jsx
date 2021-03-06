﻿//node imports
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { orderActions } from '../_actions/order.actions';
import { addressActions } from '../_actions';

import '../styling/OrderStyling.css';
import { history } from '../_helpers';
import { shoppingCartActions } from '../_actions';
import { alertActions } from '../_actions';

var string = "none";

function onChange(e) {
    string = e;
}

class OrderPage extends React.Component {
    componentDidMount() {
        this.props.AddressByUser()
    }

    handleOrder(shoppingCartItems) {
        this.props.createOrder(shoppingCartItems);
        //this.props.clearShoppingCart();
        //setTimeout(function () { history.push("/products"); }, 3000);
    }

    checkout(string, items) {
        if (string == "Ideal") {
            alertActions.success("Your Payment with Ideal was succesful");
            this.handleOrder(items);
        } else if (string == "Paypal") {
            alertActions.success("Your Payment with Paypal was succesful");
            this.handleOrder(items);
        } else if (string == "Visa") {
            alertActions.success("Your Payment with Visa was succesful");
            this.handleOrder(items);
        } else {
            alertActions.error("Sorry, you need to select a payment option.");
        }
    }

    render() {
        const { authentication, order, address } = this.props;
        const items = this.props.items;
        var total = 0;
        for (var i = 0; i < items.length; i++) {
            total += items[i].product.price * items[i].amount;
        }

        if (authentication.user == null) {
            history.push("/login");
            return (null);
        } else {
            return (
                <div>
                {!order.loading && address.items &&
                        <div className="container">
                        <div className="row">
                            <div className="col-sm-7">
                                <div className="section orderbox">
                                    {items.map((item, index) =>
                                        <div className="row cartitem">
                                            <div className="col-md-3">
                                                <img src={item.product.imageUrl} height="80px" width="80px;" />
                                            </div>
                                            <div className="col-md-4">
                                                <h6>Name</h6>
                                                <p>{item.product.name}</p>
                                            </div>
                                            <div className="col-md-2">
                                                <h6>Price</h6>
                                                <p>{item.product.price}</p>
                                            </div>
                                            <div className="col-md-2">
                                                <h6>Amount</h6>
                                                <p>{item.amount}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="section pricebox">
                                    <div className="price">
                                        <p>total price: <span>{total}</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-5">
                                <div className="section userbox">
                                    <div className="row"><i className="fas fa-user-circle user"></i><h5>{authentication.user.firstName} {authentication.user.lastName}</h5></div>
                                    <div className="row"><h6>{address.items.country}</h6></div>
                                    <div className="row"><h6>{address.items.county} </h6></div>
                                    <div className="row"><h6>{address.items.street} {address.items.streetNumber}{address.items.streetSupplement} {address.items.city}</h6></div>
                                </div>
                                <div className="section paymentbox">
                                    <form>
                                        <div className="row payment">
                                            <div className="col-md-2">
                                                <input type="radio" name="drone" id="Ideal" onChange={() => { onChange("Ideal") }} />
                                            </div>
                                            <div className="col-md-10">
                                                <div className="row">
                                                    <img alt="" src="https://upload.wikimedia.org/wikipedia/commons/e/e9/IDEAL_Logo.png" width="40px" height="40px" />
                                                    <p>Ideal</p>
                                                    <select>
                                                        <option value="Ing">Ing</option>
                                                        <option value="Rabobank">Rabobank</option>
                                                        <option value="Abn">ABN Amro</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row payment">
                                            <div className="col-md-2">
                                                <input type="radio" name="drone" id="Paypal" onChange={() => { onChange("Paypal") }} />
                                            </div>
                                            <div className="col-md-10">
                                                <div className="row">
                                                    <img alt="" src="https://upload.wikimedia.org/wikipedia/fr/thumb/4/46/Paypal_2014_%28logo%29.png/912px-Paypal_2014_%28logo%29.png" width="40px" height="40px" />
                                                    <p>PayPal</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row payment">
                                            <div className="col-md-2">
                                                <input type="radio" name="drone" id="Visa" onChange={() => { onChange("Visa") }} />
                                            </div>
                                            <div className="col-md-10">
                                                <div className="row">
                                                    <img alt="" src="https://business.visa.com/Content/images/tarjeta-visa-empresarial/tarjetas.png" width="40px" height="40px" />
                                                    <p>Visa</p>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    {order.loading &&
                                        // disabled button (loading)
                                        <button className="btn btn-info checkout-btn" disabled>Checkout</button>
                                        ||
                                        // order button
                                        <button className="btn btn-info checkout-btn" onClick={() => { this.checkout(string, items) }}>Checkout</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                        ||
                        <div className="progress">
                            <div className="indeterminate"></div>
                        </div>}
                </div>
            
            );
        }
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { shoppingCart } = state;
    const { order } = state;
    const { items } = shoppingCart;
    const { address } = state;
    return {
        authentication,
        items,
        order,
        address
    };
}

// Map actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        createOrder: shoppingCartItems => dispatch(orderActions.create(shoppingCartItems)),
        AddressByUser: () => dispatch(addressActions.getByUser())
    }
};

const connectedOrderPage = connect(mapStateToProps, mapDispatchToProps)(OrderPage);
export { connectedOrderPage as OrderPage };