import React from 'react';

export class AdminStockItem extends React.Component {
    constructor(props) {
        super(props);

        window.component = this;

        this.state = {
            order: this.props.order,
            orderState: this.props.orderState,
            index: this.props.index
        }
    }

    confirmPayment() {
        console.log("Mark order as ConfirmPayment");
    }

    sendOrder() {
        console.log("Mark order as SendOrder");
    }

    updateItem(newOrderState) {
        this.setState({
            orderState: newOrderState
        });
    }

    render() {
        const { order, orderState } = this.state;

        return (
            <tr className="admin-order-mangement-item">
                <th scope="row">{order.id}</th>
                <td>{order.orderDate}</td>
                <td>{orderState}</td>
                <td><p onClick={confirmPayment}>Confirm Payment</p></td>
                <td><p onClick={sendOrder}>Send Order</p></td>
            </tr>
        );
    }
}