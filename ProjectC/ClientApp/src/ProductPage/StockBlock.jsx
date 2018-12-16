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
                                <br />
                                <small>Only {stock} left. Order now!</small>
                            </div>
                        : // Not in stock
                        <div>
                            <div className="product-stock text-danger">
                                Currently not in stock &nbsp;
                                <i className="fas fa-skull-crossbones"></i>
                            </div>
                            <br />
                            {
                                amount
                                &&
                                initialStock > 0
                                &&
                                <span>
                                    <small>Only {amount - (amount - initialStock)} out of {amount} selected {amount != 1 ? `items are` : `item is`} currently in stock.</small>
                                    <br />
                                </span>
                            }
                            <small className="text-danger">You can still order {amount && amount > 1 ? `these products` : `this product`} but please take extra delivery time into account.</small>
                        </div>
                }
            </div>
        );
    }
}