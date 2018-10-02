import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class AdminPanel extends React.Component {

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi!</h1>
                <p>Welcome to the admin panel</p>
                <a href="/adminpanel/product">Products list and actions</a>
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