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
                    <table class="table">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Date</th>
                            <th scope="col">Price</th>
                            <th scope="col">UserId</th>
                        </tr>
                    {order.items && order.items.map((order, index) =>
                        <tr>
                            <td scope="row"><Link to={`/adminpanel/order/${order.id}`}>{order.id}</Link></td>
                            <td><Link to={`/adminpanel/order/${order.id}`}>{order.orderDate}</Link></td>
                            <td><Link to={`/adminpanel/order/${order.id}`}>{order.totalPrice}</Link></td>
                            <td><Link to={`/adminpanel/order/${order.id}`}>{order.userId}</Link></td>
                        </tr>
                        )}
           
                    </table>
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