//node imports
import React from 'react';

export class StockBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var stock = this.props.stock;
        var initialStock = stock;
        var amount = this.props.amount; // <- Note: amount is not required, can be null

        if (amount) {
            stock -= (amount - 1); // Subtract from stock if any amount is given
        }

        return (
            <div>
                {
                    stock > 0
                        ?
                        stock > 5 // In stock and not low
                            ?
                            <div className="product-stock text-success">
                                In stock &nbsp;
                                <i className="fas fa-dolly"></i>
                            </div>
                            : // In stock but low stock
                            <div>
                                <div className="product-stock text-warning">
                                    Limited stock &nbsp;
                                    <i className="fas fa-people-carry"></i>
                                </div>
                            </div>
                        : // Not in stock
                        <div>
                            <div className="product-stock text-danger">
                                Currently not in stock &nbsp;
                                <i className="fas fa-times"></i>
                            </div>
                            <br />
                            <small className="text-danger">You can still order {amount && amount > 1 ? `these products` : `this product`} but please take extra delivery time into account.</small>
                        </div>
                }
            </div>
        );
    }
}