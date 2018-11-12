import React from 'react';
import { connect } from 'react-redux';
import { orderActions } from '../_actions';

class AdminOrders extends React.Component {
    componentDidMount() {
        this.props.getAllorders();

        // Make component accessible
        window.component = this;
    }

    render() {
        const { order } = this.props;
        return (
            <div class="panel col-md-8">
                {order.items && order.items.map((order, index) => 
                    <p>{order.id}</p>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { order } = state;
    return {
        order
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // accessible via this.props.getAllProducts
        getAllorders: () => dispatch(orderActions.getAll()),
        
    }
};

const connectedOrderPage = connect(mapStateToProps, mapDispatchToProps)(AdminOrders);
export { connectedOrderPage as AdminOrders };