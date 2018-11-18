import React from 'react';
import { connect } from 'react-redux';

class HomePage extends React.Component {

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi, welcome to C-Mobile!</h1>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };