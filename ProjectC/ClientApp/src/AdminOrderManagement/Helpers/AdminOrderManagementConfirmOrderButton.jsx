import React from 'react';
import { connect } from 'react-redux';

import { orderActions } from '../../_actions';

class AdminOrderManagementConfirmOrderButton extends React.Component {
    constructor(props) {
        super(props);

        let buttonActive;
        if (this.props.orderState < 1) {
            buttonActive = true;
        } else {
            buttonActive = false;
        }

        this.state = {
            orderState: this.props.orderState,
            active: buttonActive
        };
    }

    disableButton() {
        this.setState((prevState) => ({
            ...prevState,
            active: false
        }));

        this.props.orderItem.confirmPayment();
    }

    confirmPayment(e) {
        e.preventDefault();
        if (this.state.active) {
            const { dispatch } = this.props;
            console.log("Mark order as ConfirmPayment");
            dispatch(orderActions.setOrderStatusConfirmed(this, this.props.id));
        }
        
    }

    updateItem(newOrderState) {
        this.setState({
            orderState: newOrderState
        });
    }

    render() {
        const { active, orderState } = this.state;

        return (
            <td>
                <button className="btn btn-info" disabled={!active} onClick={this.confirmPayment.bind(this)}>Confirm Payment</button>
            </td>
        );
    }
}

function mapStateToProps(state) {
    const { } = state;
    return {

    };
}

const connectedPage = connect(mapStateToProps)(AdminOrderManagementConfirmOrderButton);
export { connectedPage as AdminOrderManagementConfirmOrderButton };