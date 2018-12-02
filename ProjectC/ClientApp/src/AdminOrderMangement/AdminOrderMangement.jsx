import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { orderActions } from '../_actions';

class AdminOrderMangement extends React.Component {
    componentDidMount() {

        this.state = {
            pendingOrders: this.props.dispatch(orderActions.getPending()),
            confirmedOrders: this.props.dispatch(orderActions.getConfirmed()),
            sendOrders: this.props.dispatch(orderActions.getSend())
        };

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