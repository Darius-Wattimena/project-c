import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { orderActions } from '../_actions';
import { AdminOrderManagementItem } from './Helpers'

class AdminOrderManagement extends React.Component {
    componentDidMount() {
        this.props.dispatch(orderActions.getPendingOrders());

        window.component = this;
    }

    render() {
        const { order } = this.props;
        return (
            <div className="panel col-md-8 admin-stock">
                <h3>Order Management</h3>

                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Order Date</th>
                            <th scope="col">Order State</th>
                            <th scope="col">Confirm Action</th>
                            <th scope="col">Send Action</th>
                        </tr>
                    </thead>
                    {order.loading && <em>Loading orders...</em>}
                    {order.error && <span className="text-danger">ERROR: {order.error}</span>}
                    {order.items &&
                    <tbody>
                        {order.items.map((order, index) =>
                            <AdminOrderManagementItem order={order} orderState={order.orderState} index={index} />
                        )}
                    </tbody>
                    }
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

const connectedPage = connect(mapStateToProps)(AdminOrderManagement);
export { connectedPage as AdminOrderManagement };