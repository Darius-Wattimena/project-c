import React from 'react';
import { orderActions, orderProductsActions } from '../../_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class OrderHistory extends React.Component {
    componentDidMount() {
        this.props.OrderByUser();
    }

    onClick(orderid) {
        this.props.ProductsByOrder(orderid);
        console.log(this.props.orderProducts);
    }

    render() {
        const { order } = this.props;
        const { orderProducts } = this.props;
        return (
            <div class="row">
                <div class="panel col-md-5">
                    <table class="table">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Date</th>
                            <th scope="col">Totalprice</th>
                        </tr>
                        {order.items && order.items.map((order, index) =>
                            <tr>
                                <td scope="row">{order.id}</td>
                                <td><a onClick={this.onClick.bind(this, order.id)}>{order.orderDate}</a></td>
                                <td>{order.totalPrice}</td>
                            </tr>
                        )}
                        {!order.items && <p>Loading...</p>}
                        {order.items == 0 && <p>You dont have any orders.</p>}

                    </table>
                </div>
                <div class="col-md-5">
                    {orderProducts.items && orderProducts.items.map((order, index) =>
                        <tr>
                            <h5 scope="row">{order.orderProducts.id}</h5>
                            <h5>{order.product.name}</h5>
                            <img src={order.product.imageUrl} width="80" height="80"></img>
                        </tr>
                    )}
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

