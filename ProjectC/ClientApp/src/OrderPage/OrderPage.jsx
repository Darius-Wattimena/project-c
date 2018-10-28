//node imports
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../styling/OrderStyling.css';
import { history } from '../_helpers';

var string = "none";

function Checkout(e) {
    if (string == "Ideal") {
        history.push("/products");
        alert("Your Payment with Ideal was succesfull");
    } else if (string == "Paypal") {
        history.push("/products");
        alert("Your Payment with Paypal was succesfull");
    } else if (string == "Visa") {
        history.push("/products");
        alert("Your Payment with Visa was succesfull");
    } else {
        alert("Sorry you need to select a payment option");
    }
}

function onChange(e) {
    string = e;
}

class OrderPage extends React.Component {
    render() {
        const { user } = this.props;
        const { products } = this.props;
        var total = 0;
        for (var i = 0; i < products.length; i++) {
            total += products[i].price;
        }

        if (user == null) {
            history.push("/login");
            return (null);
        } else {
            return (
                <div>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-7">
                                <div className="section orderbox">
                                    {products.map((product, index) =>
                                        <div class="row cartitem">
                                            <div class="col-md-3">
                                                <img src={product.ImageUrl} height="80px" width="80px;" />
                                            </div>
                                            <div class="col-md-5">
                                                <h6>Name</h6>
                                                <p>{product.name}</p>
                                            </div>
                                            <div class="col-md-4">
                                                <h6>Price</h6>
                                                <p>{product.price}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="section pricebox">
                                    <label>Coupon Code:</label>
                                    <input type="text" />
                                    <div class="price">
                                        <p>total price: <span>{total}</span></p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-5">
                                <div className="section userbox">
                                    <div className="row"><i class="fas fa-user-circle user"></i><h5>{user.firstname} {user.lastname}</h5></div>
                                </div>
                                <div className="section paymentbox">
                                    <form>
                                        <div class="row payment">
                                            <div class="col-md-2">
                                                <input type="radio" name="drone" id="Ideal" onChange={() => { onChange("Ideal") }} />
                                            </div>
                                            <div class="col-md-10">
                                                <div class="row">
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

                                        <div class="row payment">
                                            <div class="col-md-2">
                                                <input type="radio" name="drone" id="Paypal" onChange={() => { onChange("Paypal") }} />
                                            </div>
                                            <div class="col-md-10">
                                                <div class="row">
                                                    <img alt="" src="https://pbs.twimg.com/profile_images/1014219302495375360/dIgZhxTm_400x400.jpg" width="40px" height="40px" />
                                                    <p>Paypal</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row payment">
                                            <div class="col-md-2">
                                                <input type="radio" name="drone" id="Visa" onChange={() => { onChange("Visa") }}  />
                                            </div>
                                            <div class="col-md-10">
                                                <div class="row">
                                                    <img alt="" src="https://business.visa.com/Content/images/tarjeta-visa-empresarial/tarjetas.png" width="40px" height="40px" />
                                                    <p>Visa</p>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <button class="btn btn-info checkout-btn" onClick={() => { Checkout(string) }}>Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            );
        }
    }




}

function mapStateToProps(state) {
    const { authentication } = state;
    const { shoppingCart } = state;
    const { user } = authentication;
    const { products } = shoppingCart;
    return {
        user,
        products
    };
}

const connectedOrderPage = connect(mapStateToProps)(OrderPage);
export { connectedOrderPage as OrderPage };