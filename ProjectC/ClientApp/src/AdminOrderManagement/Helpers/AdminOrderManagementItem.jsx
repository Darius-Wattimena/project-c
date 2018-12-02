import React from 'react';
import { connect } from 'react-redux';

import { orderActions } from '../../_actions';

class AdminOrderManagementItem extends React.Component {
    constructor(props) {
        super(props);

        let confirmButtonActive;
        let sendButtonActive;

        if (this.props.orderState < 1) {
            confirmButtonActive = true;
            sendButtonActive = true;
        } else if (this.props.orderState < 2) {
            confirmButtonActive = false;
            sendButtonActive = true;
        } else {
            confirmButtonActive = false;
            sendButtonActive = false;
        }
        
        this.state = {
            order: this.props.order,
            orderState: this.props.orderState,
            index: this.props.index,
            confirmButtonActive: confirmButtonActive,
            sendButtonActive: sendButtonActive
        }
    }

    disableConfirmButton() {
        this.setState((prevState) => ({
            ...prevState,
            confirmButtonActive: false,
            orderState: 1
        }));
    }

    disableSendButton() {
        this.setState((prevState) => ({
            ...prevState,
            confirmButtonActive: false,
            sendButtonActive: false,
            orderState: 2
        }));
    }

    confirmPayment(e) {
        e.preventDefault();
        if (this.state.confirmButtonActive) {
            const { dispatch } = this.props;
            console.log("Mark order as ConfirmPayment");
            dispatch(orderActions.setOrderStatusConfirmed(this, this.state.order.id));
        }
    }

    confirmSend(e) {
        e.preventDefault();
        if (this.state.sendButtonActive) {
            const { dispatch } = this.props;
            console.log("Mark order as OrderSend");
            dispatch(orderActions.setOrderStatusSend(this, this.state.order.id));
        }
    }

    updateItem(newOrderState) {
        this.setState({
            orderState: newOrderState
        });
    }

    orderStateToText(orderState) {
        switch (orderState) {
        case 0:
            return "Payment Pending";
        case 1:
            return "Payment Confirmed";
        case 2:
            return "Order Send";
        default:
            return "Unknown";
        }
    }

    getParsedDate(date) {
        var dateParts = date.split("-");
        var jsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0, 2));

        return jsDate.toISOString().split('T')[0];
    }

    render() {
        const { order, orderState, confirmButtonActive, sendButtonActive } = this.state;

        return (
            <tr className="admin-order-mangement-item">
                <th scope="row">{order.id}</th>
                <td>{this.getParsedDate(order.orderDate)}</td>
                <td>{this.orderStateToText(orderState)}</td>
                <td><button className="btn btn-info" disabled={!confirmButtonActive} onClick={this.confirmPayment.bind(this)}>Confirm Payment</button></td>
                <td><button className="btn btn-info" disabled={!sendButtonActive} onClick={this.confirmSend.bind(this)}>Send Order</button></td>
            </tr>
        );
    }
}

function mapStateToProps(state) {
    const { } = state;
    return {

    };
}

const connectedPage = connect(mapStateToProps)(AdminOrderManagementItem);
export { connectedPage as AdminOrderManagementItem };