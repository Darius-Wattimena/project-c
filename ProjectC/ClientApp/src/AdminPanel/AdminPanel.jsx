import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';

import '../styling/AdminpanelStyling.css';

class AdminPanel extends React.Component {

    constructor(props) {
        super(props);
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        if (!user || user.role != "Admin") {
            history.push("/login");
        }
    }

    render() {
        return (
            <div className="sidebar" style={{ float: "left" }}>
                <ul>
                    <li>
                        <Link to="/admin/statistics" className="row">
                            <div className="col-1">
                                <i class="fas fa-chart-line" />
                            </div>
                            <div className="col">
                                Statistics
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/product" className="row">
                            <div className="col-1">
                                <i class="fas fa-boxes" />
                            </div>
                            <div className="col">
                                Products
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/stock" className="row">
                            <div className="col-1">
                                <i class="fas fa-clipboard-list" />
                            </div>
                            <div className="col">
                                Stock
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/users" className="row">
                            <div className="col-1">
                                <i class="fas fa-users" />
                            </div>
                            <div className="col">
                                Users
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/ordermanagement" className="row">
                            <div className="col-1">
                                <i class="fas fa-hand-holding-usd" />
                            </div>
                            <div className="col">
                                Orders
                            </div>
                        </Link>
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