﻿import React from 'react';
import { orderActions, orderProductsActions } from '../../_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../../styling/orderHistoryStyling.css';

class OrderHistory extends React.Component {
    componentDidMount() {
        this.props.OrderByUser();
        this.setState({
            os: 3
        });
    }

    onClick(orderid, s) {
        this.props.ProductsByOrder(orderid);
        this.setState({
            os: s
        });
    }

    render() {
        const { order } = this.props;
        const { orderProducts } = this.props;
        return (
            <div class="row">
                <div class="col-md-5 sec">
                    <h4>Orders</h4>
                    <div className="orders">
                        {order.items && order.items.map((order, index) =>
                            <a onClick={this.onClick.bind(this, order.id, order.orderState)}>
                            <div class="orderh">
                                <p scope="row">{order.id}</p>
                                <p>{order.orderDate.replace("T", " ")}</p>
                                <p>TotalPrice: {order.totalPrice}</p>
                                </div>
                            </a>
                        )}
                        {!order.items && <p>Loading...</p>}
                        {order.items == 0 && <p>You dont have any orders.</p>}

                    </div>
                </div>
                <div class="col-md-6 sec">
                    <h4>OrderInfo</h4>
                    <div className="orderStatus">
                        {this.state && <ul className="progressbar">
                            <li className="active">Proccesing Order</li>
                            {this.state.os > 0 && <li className="active">On the move</li>}
                            {this.state.os <= 0 && <li >On the move</li>}
                            {this.state.os > 1 && <li className="active">Delivered</li>}
                            {this.state.os <= 1 && <li>Delivered</li>}
                        </ul>}
                    </div>
                    <h4>Products</h4>
                    <div className="orderProducts">  
                        {!orderProducts.items && <p>Loading...</p>}
                        {orderProducts.items == 0 && <p>This order doesn't contain any products.</p>}
                        {orderProducts.items && orderProducts.items.map((order, index) =>
                            <div className="orderProduct row">
                                <img src={order.product.imageUrl} width="70" height="70"></img>
                                <h5>{order.product.name}</h5>
                                <h6>price: {order.product.price}</h6>
                                <h6>amount: {order.orderProducts.amount}</h6>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { order } = state;
    const { orderProducts } = state;
    return {
        order,
        orderProducts
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // accessible via this.props.getAllProducts
        OrderByUser: () => dispatch(orderActions.getByUser()),
        ProductsByOrder: orderId => dispatch(orderProductsActions.getById(orderId))
    }
};

const connectedOrderHistory = connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
export { connectedOrderHistory as OrderHistory };
