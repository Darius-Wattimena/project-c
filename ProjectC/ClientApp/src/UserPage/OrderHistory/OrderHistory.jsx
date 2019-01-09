﻿import React from 'react';
import { orderActions, orderProductsActions } from '../../_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../_helpers/currency-format';

import '../../styling/orderHistoryStyling.css';

class OrderHistory extends React.Component {
    componentDidMount() {
        this.props.OrderByUser();
        this.setState({
            os: 0
        });

        this.initialized = false;
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

        console.log(this.ios);

        // SET id
        if (this.initialized == false && order.items && order.items.length > 0) {
            console.log("SELECT FIRST ITEM");
            var firstOrderId = order.items[0].id;
            this.onClick(firstOrderId, order.items[0].orderState);
            this.initialized = true;
        }

        var selectedId = (orderProducts.items && orderProducts.items.length > 0 ? orderProducts.items[0].orderProducts.orderId : -1);

        return (
            <div className="row xohf">
                <div className="col-md-5 sec">
                    <h4>Orders</h4>
                    <div className="xorders">
                        <table className="table table-striped orderTable">
                            <tbody>
                                {order.items && order.items.map((order, index) =>
                                    <tr className={selectedId === order.id ? 'selected' : 'notselected'}>
                                        <td style={{ cursor: 'pointer' }} onClick={this.onClick.bind(this, order.id, order.orderState)}>
                                            <a>
                                                <div className="xorderh">
                                                    <p><span style={{ color: '#2b91af' }}>Order number: </span> {order.orderNumber}</p>
                                                    <p><span style={{ color: '#2b91af' }}>Placed on </span>{order.dateFormat}</p>
                                                    <p><span style={{ color: '#2b91af' }}>Total Price: </span> {formatCurrency(order.totalPrice)}</p>
                                                </div>
                                            </a>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            {!order.items
                                &&
                                <div className="progress">
                                    <div className="indeterminate"></div>
                                </div>
                            }
                            {order.items == 0 && <p>You dont have any orders.</p>}
                        </table>
                    </div>
                </div>
                <div className="col-md-6 sec">
                    <h4>Order Info</h4>
                    <div className="orderStatus">
                        {this.state && <ul className="progressbar">
                            {this.state.os > 0 && <li className="active">Refilling stock</li>}
                            {this.state.os <= 0 && <li >Refilling stock</li>}
                            {this.state.os > 1 && <li className="active">Order confirmed</li>}
                            {this.state.os <= 1 && <li >Order confirmed</li>}
                            {this.state.os > 2 && <li className="active">Order send</li>}
                            {this.state.os <= 2 && <li>Order send</li>}
                        </ul>}
                    </div>
                    <h4>Products</h4>
                    <div className="orderProducts">
                        {!orderProducts.items &&
                            <div className="progress">
                                <div className="indeterminate"></div>
                            </div>
                        }
                        {orderProducts.items == 0 && <p>This order doesn't contain any products.</p>}
                        {orderProducts.items && orderProducts.items.map((order, index) =>
                            <div className="orderProduct row">
                                <img src={order.product.imageUrl} width="70" height="70"></img>
                                <h5>{order.product.name}</h5>
                                <h6>Price: {formatCurrency(order.product.price)}</h6>
                                <h6>Amount: {order.orderProducts.amount}</h6>
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

