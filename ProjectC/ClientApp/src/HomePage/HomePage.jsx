import React from 'react';
import { connect } from 'react-redux';

class HomePage extends React.Component {
    render() {
        return null;
    }
}

function mapStateToProps(state) {
    const { users } = state;
    return {
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };