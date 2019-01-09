import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { orderActions } from '../_actions';

class AdminOrders extends React.Component {
    componentDidMount() {
        this.props.getAllorders();

        // Make component accessible
        window.component = this;
    }

    render() {
        const { order } = this.props;
        return (
            <div className="admin-panel panel col-10"> 
                <table className="table table-hover">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Order Date</th>
                        <th scope="col">Order State</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">User ID</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {order.items && order.items.length > 0 && order.items.map((order, index) =>
                            <tr>
                                <td>{order.id}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.orderState}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.userId}</td>
                                <td>
                                    <Link to={`/admin/order/${order.id}`}>
                                        View More
                                    </Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { order } = state;
    return {
        order
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // accessible via this.props.getAllProducts
        getAllorders: () => dispatch(orderActions.getAll())
    }
};

const connectedOrderPage = connect(mapStateToProps, mapDispatchToProps)(AdminOrders);
export { connectedOrderPage as AdminOrders };