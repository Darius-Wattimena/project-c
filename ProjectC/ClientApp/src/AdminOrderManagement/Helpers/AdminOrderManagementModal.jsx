import React from 'react';
import { connect } from 'react-redux';

import { orderActions } from '../../_actions';

function NoStockIcon(props) {
    if (props.stock < props.amount) {
        return (
            <td className="admin-order-management-icon">
                Not enough stock! <i className="fas fa-exclamation-triangle" data-toggle="tooltip" data-placement="top" title="Low Stock" style={{ color: 'red' }} />
            </td>
        );
    }

    return (
        <td className="admin-order-management-icon">
            Enough stock <i className="fas fa-check" data-toggle="tooltip" data-placement="top" title="Low Stock" style={{ color: 'green' }} />
        </td>
    );
}

class AdminOrderManagementModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { index, order, base, orderProducts } = this.props;
        return (
            <div className="modal fade" id={`Modal${index}`} tabindex="-1" role="dialog" aria-labelledby={`ModalCenterTitle`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`ModalCenterTitle`}>#{order.orderId} View Order Details</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {orderProducts.loading &&
                                <div className="progress">
                                    <div className="indeterminate"></div>
                                </div>
                            }
                            {orderProducts.items &&
                            <table className="table">
                                <tr>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Enough Stock</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col">Amount</th>
                                </tr>
                                {orderProducts.items && orderProducts.items.map((orderProducts, index) =>
                                    <tr>
                                        <td scope="row">{orderProducts.product.name}</td>
                                        <NoStockIcon stock={orderProducts.product.stock} amount={orderProducts.orderProducts.amount} />
                                        <td>{orderProducts.product.stock}</td>
                                        <td>{orderProducts.orderProducts.amount}</td>
                                    </tr>
                                )}

                            </table>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button id={`adminOrderManagementModalHideButton${index}`} type="button" data-dismiss="modal" style={{ display: `none` }} />
                        </div>
                    </div>
                </div>
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

const connectedPage = connect(mapStateToProps)(AdminOrderManagementModal);
export { connectedPage as AdminOrderManagementModal };