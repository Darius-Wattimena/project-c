import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { orderActions } from '../_actions';

class AdminOrderMangement extends React.Component {
    componentDidMount() {

        this.props.dispatch(orderActions.getPendingOrders());

        // Make component accessible
        window.component = this;
    }

    render() {
        const { order } = this.props;
        return (
            <div className="panel col-md-8 admin-order-mangement"> 
                    
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

const connectedPage = connect(mapStateToProps)(AdminOrderMangement);
export { connectedPage as AdminOrderMangement };