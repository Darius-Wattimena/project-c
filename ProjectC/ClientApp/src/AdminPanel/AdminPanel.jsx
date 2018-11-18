import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../styling/AdminpanelStyling.css';

class AdminPanel extends React.Component {

    render() {
        return (
            <div class="sidebar" style={{ float: "left" }}>
                <ul>
                    <li>
                        <Link to="/admin/statistics">Statistics</Link>
                    </li>
                    <li>
                        <Link to="/admin/product">Products</Link>
                    </li>
                    <li>
                        <Link to="/admin/stock">Stock</Link>
                    </li>
                    <li>
                        <Link to="/admin/users">Users</Link>
                    </li>
                    <li>
                        <Link to="/admin/orders">Orders</Link>
                    </li>
                    <li>
                        <Link to="/admin/sales">Sale Management</Link>
                    </li>
                    <li>
                        <Link to="/admin/coupons">Coupons</Link>
                    </li>
                    <li>
                        <Link to="/admin/reviews">Reviews</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { s } = state;
    return {
        s
    };
}

const connectedAdminPanel = connect(mapStateToProps)(AdminPanel);
export { connectedAdminPanel as AdminPanel };