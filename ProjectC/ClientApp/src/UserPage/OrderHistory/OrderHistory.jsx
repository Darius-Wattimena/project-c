import React from 'react';
import { orderActions, orderProductsActions } from '../../_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class OrderHistory extends React.Component {
    componentDidMount() {
        this.props.OrderByUser();
    }

    render() {
        const { order } = this.props;
        const { orderProducts } = this.props;
        return (
            <div class="panel col-md-8">
                <table class="table">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Date</th>
                        <th scope="col">Price</th>
                    </tr>
                    {order.items && order.items.length > 0 && order.items.map((order, index) =>
                        <tr>
                            <td scope="row">{order.id}</td>
                            <td><Link to={`orderhistory/${order.id}`}>{order.orderDate}</Link></td>
                            <td>{order.totalPrice}</td>
                        </tr>
                    )}

                </table>
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

