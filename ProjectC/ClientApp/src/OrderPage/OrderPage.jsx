//node imports
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { orderActions } from '../_actions/order.actions';

import '../styling/OrderStyling.css';
import { history } from '../_helpers';
import { shoppingCartActions } from '../_actions';

var string = "none";

function onChange(e) {
    string = e;
}

class OrderPage extends React.Component {

    handleOrder(shoppingCartItems) {
        this.props.createOrder(shoppingCartItems);
        //this.props.clearShoppingCart();
        //setTimeout(function () { history.push("/products"); }, 3000);
    }

    checkout(string, items) {
        if (string == "Ideal") {
            alert("Your Payment with Ideal was succesfull");
            this.handleOrder(items);
        } else if (string == "Paypal") {
            alert("Your Payment with Paypal was succesfull");
            this.handleOrder(items);
        } else if (string == "Visa") {
            alert("Your Payment with Visa was succesfull");
            this.handleOrder(items);
        } else {
            alert("Sorry you need to select a payment option");
        }
    }

    render() {
        const { user, order } = this.props;
        const items = this.props.items;
        var total = 0;
        for (var i = 0; i < items.length; i++) {
            total += items[i].product.price * items[i].amount;
        }

        if (user == null) {
            history.push("/login");
            return (null);
        } else {
            return (
                <div>
                {!order.loading &&
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
                                    <label>Coupon Code:</label>
                                    <input type="text" />
                                    <div className="price">
                                        <p>total price: <span>{total}</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-5">
                                <div className="section userbox">
                                    <div className="row"><i className="fas fa-user-circle user"></i><h5>{user.firstname} {user.lastname}</h5></div>
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
                                                        <option value="Abn">ABN Ambro</option>
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
                                                    <img alt="" src="https://pbs.twimg.com/profile_images/1014219302495375360/dIgZhxTm_400x400.jpg" width="40px" height="40px" />
                                                    <p>Paypal</p>
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
                    || <p>Processing order...</p>}
                </div>
            
            );
        }
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { shoppingCart } = state;
    const { order } = state;
    const { user } = authentication;
    const { items } = shoppingCart;
    return {
        user,
        items,
        order
    };
}

// Map actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        createOrder: shoppingCartItems => dispatch(orderActions.create(shoppingCartItems))
    }
};

const connectedOrderPage = connect(mapStateToProps, mapDispatchToProps)(OrderPage);
export { connectedOrderPage as OrderPage };