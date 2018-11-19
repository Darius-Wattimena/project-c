import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { orderActions } from '../_actions';
import { userActions } from '../_actions';

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
                    {order.items && order.items.length > 0 && order.items.map((order, index) =>
                        <tr>
                            <td scope="row"><Link to={`/admin/order/${order.id}`}>{order.id}</Link></td>
                            <td><Link to={`/admin/order/${order.id}`}>{order.orderDate}</Link></td>
                            <td><Link to={`/admin/order/${order.id}`}>{order.totalPrice}</Link></td>
                            <td><Link to={`/admin/order/${order.id}`}>{order.userId}</Link></td>
                        </tr>
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
        getAllorders: () => dispatch(orderActions.getAll())
    }
};

const connectedOrderPage = connect(mapStateToProps, mapDispatchToProps)(AdminOrders);
export { connectedOrderPage as AdminOrders };