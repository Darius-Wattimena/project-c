﻿import React from 'react';
import { connect } from 'react-redux';
import { history } from '../_helpers';

import { userActions } from '../_actions';

import '../styling/UserPageStyling.css';
import { OrderHistory } from './OrderHistory';

var page = "Profile";


function Page(props) {
    const page = props.page

    if (page === "Profile") {
        return null;
    }
    else if (page === "Order History") {
        return <OrderHistory />;
    }
    else if (page === "Logout") {
        return null;
    }
    else {
        return null;
    }
}

class UserPage extends React.Component {

    componentDidMount() {
        page = "Profile"
        this.setState({ p: "Profile" });
    }

    onClick(p) {
        page = p;
        this.setState({ p: page });
    }

    render() {
        const { user } = this.props;
        if (user == null) {
            history.push("/login");
            return (null);
        } else {
            return (

                <div className="row">
                    <div class="filters-container col-sm-3">
                        <nav class="navbar navbar-dark bg-info">
                            <a class="nav-link">Mijn C-Mobile</a>
                        </nav>
                        <a className="Link" onClick={this.onClick.bind(this,"Profile")}>Profile</a><br />
                        <a className="Link" onClick={this.onClick.bind(this,"Order History")}>Order History</a><br/>
                        <a className="Link" onClick={this.onClick.bind(this,"Logout")}>Logout</a><br/>
                    </div>
                    <div class="products-container col-sm-9">
                        <nav class="navbar navbar-dark bg-info">
                            <ul class="navbar-nav">
                                <li class="nav-right active">
                                    <a class="nav-link">{page}</a>
                                </li>
                            </ul>
                        </nav>
                        {this.state && <Page page={this.state.p} />}
                    </div>
                </div>

            );
        }
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedUserPage = connect(mapStateToProps)(UserPage);
export { connectedUserPage as UserPage };