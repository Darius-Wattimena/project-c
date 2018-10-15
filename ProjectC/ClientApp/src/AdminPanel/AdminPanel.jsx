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
                        <Link to="/adminpanel/statistics">Statistics</Link>
                    </li>
                    <li>
                        <Link to="/adminpanel/product">Products</Link>
                    </li>
                    <li>
                        <Link to="/adminpanel/users">Users</Link>
                    </li>
                    <li>
                        <Link to="/adminpanel/orders">Orders</Link>
                    </li>
                    <li>
                        <Link to="/adminpanel/sales">Sale Management</Link>
                    </li>
                    <li>
                        <Link to="/adminpanel/coupons">Coupons</Link>
                    </li>
                    <li>
                        <Link to="/adminpanel/reviews">Reviews</Link>
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