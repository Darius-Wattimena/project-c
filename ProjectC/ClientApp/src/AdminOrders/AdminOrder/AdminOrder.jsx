//node imports
import React from 'react';
import { connect } from 'react-redux';

import { orderProductsActions } from '../../_actions';

//base class
class AdminOrder extends React.Component {

    componentDidMount() {
        this.props.getOrdersById(this.props.match.params.orderid.toString());
    }

    render() {
        const { orderProducts } = this.props;
        return (
            <div class="panel col-md-8">
                <table class="table">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Amount</th>
                        <th scope="col">ProductId</th>
                    </tr>
                    {orderProducts.items && orderProducts.items.map((orderProducts, index) =>
                        <tr>
                            <td scope="row">{orderProducts.id}</td>
                            <td>{orderProducts.amount}</td>
                            <td>{orderProducts.productId}</td>
                        </tr>
                    )}

                </table>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { orderProducts } = state;
    return {
        orderProducts
    };
}

// Map actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        getOrdersById: id => { dispatch(orderProductsActions.getById(id)); },
    }
};

const connectedAdminOrder = connect(mapStateToProps, mapDispatchToProps)(AdminOrder);
export { connectedAdminOrder as AdminOrder };