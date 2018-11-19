import React from 'react';
import { connect } from 'react-redux';

class HomePage extends React.Component {
<<<<<<< HEAD
    render() {
        return null;
=======

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi, welcome to C-Mobile!</h1>
            </div>
        );
>>>>>>> b913d275cfdf1b2402a508e186898ae4e036478f
    }
}

function mapStateToProps(state) {
    return {
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };