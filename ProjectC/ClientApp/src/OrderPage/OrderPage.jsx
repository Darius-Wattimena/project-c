//node imports
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class OrderPage extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {


        return (
            <div>
                <div class="container">
                    <div class="row">
                        <div class="col-sm-6">
                            Order Information
                            <div class="product">
                                <h5>Apple IPhone X</h5>
                                <p>Amount 2</p>
                                <p>Price €2120</p>

                            </div>
                        </div>

                        <div class="col-sm-6">
                            Shipping Address
                        </div>
                    </div>
                </div>

            </div>
        );
    }




}



function mapStateToProps(state) {
    const { order } = state.authentication;
    return {
        order
    };
}

const connectedOrderPage = connect(mapStateToProps)(OrderPage);
export { connectedOrderPage as OrderPage };