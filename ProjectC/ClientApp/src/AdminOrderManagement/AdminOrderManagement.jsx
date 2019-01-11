import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { orderActions } from '../_actions';
import { AdminOrderManagementItem } from './Helpers'

class AdminOrderManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstRender: true
        }
    }

    componentDidMount() {
        this.props.dispatch(orderActions.getPendingOrders());

        this.setState({
            firstRender: false
        });

        window.component = this;
    }

    render() {
        const { order } = this.props;
        const { firstRender } = this.state;
        return (
            <div className="admin-panel panel col-10">
                <h3>Order Management</h3>
                <hr />
                {order.loading &&
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                }
                {order.error && <span className="text-danger">ERROR: {order.error}</span>}
                {order.items && !firstRender && 
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th></th>
                            <th scope="col">Order Date</th>
                            <th scope="col">Order State</th>
                            <th scope="col">View Action</th>
                            <th scope="col">Confirm Action</th>
                            <th scope="col">Send Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((order, index) =>
                            <AdminOrderManagementItem order={order} orderState={order.state} index={index} />
                        )}
                    </tbody>
                </table>
                }
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