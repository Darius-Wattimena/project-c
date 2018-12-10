//node imports
import React from 'react';

export class StockBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const stock = this.props.stock;

        return (
            <div>
                {
                    stock > 0
                        ?
                        stock > 5 // In stock and not low
                            ?
                            <div className="product-stock text-success">
                                In stock &nbsp;
                                <i class="fas fa-dolly"></i>
                            </div>
                            : // In stock but low stock
                            <div>
                                <div className="product-stock text-warning">
                                    Limited stock &nbsp;
                                    <i class="fas fa-people-carry"></i>
                                </div>
                                <br />
                                <small>Only {stock} left. Order now!</small>
                            </div>
                        : // Not in stock
                        <div>
                            <div className="product-stock text-danger">
                                Currently not in stock &nbsp;
                        <i class="fas fa-skull-crossbones"></i>
                            </div>
                            <br />
                            <small>You can still order this product but please take extra delivery time into account.</small>
                        </div>
                }
            </div>
        );
    }
}