import React from 'react';

import { AdminStockProgressBar, AdminStockAddStockButton, AdminStockAddStockModal } from "./index";

function NoStockIcon(props) {
    if (props.stock == 0) {
        return (
            <div className="admin-stock-icon">
                No Stock! <i className="fas fa-exclamation-triangle" data-toggle="tooltip" data-placement="top" title="Low Stock" style={{ color: 'red' }} />
            </div>
        );
    }

    if (props.stock < 6) {
        return (
            <div className="admin-stock-icon">
                Low Stock <i className="fas fa-exclamation-triangle" data-toggle="tooltip" data-placement="top" title="Low Stock" />
            </div>);
    }
    return <i />;
}

export class AdminStockItem extends React.Component {
    constructor(props) {
        super(props);

        window.component = this;

        this.state = {
            product: this.props.product,
            stock: this.props.stock,
            index: this.props.index,
            modalActive: false
        }
    }

    onOpenModal(event) {
        event.preventDefault();
        this.setState({
            modalActive: true
        });
    }

    onCloseModal(event) {
        event.preventDefault();
        this.setState({
            modalActive: false
        });
    }

    updateItem(newStock) {
        this.setState({
            stock: newStock,
            modalActive: false
        });
    }

    render() {
        const { stock, product, index, modalActive } = this.state;

        console.log("modal open", modalActive);

        return (
            <div className="card admin-stock-item">
                <div className="card-header" id={`heading${index}`} data-toggle="collapse" data-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                    <h5 className="mb-0">
                        <div className="row">
                            <button className="btn btn-link collapsed" type="button">
                                {product.name}
                            </button>
                            <NoStockIcon stock={stock} />
                        </div>
                    </h5>
                </div>
                <div id={`collapse${index}`} className="collapse" aria-labelledby={`heading${index}`} data-parent="#stockAccordion">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-11">
                                <h4>Current stock: {stock}</h4>
                            </div>
                            <div className="col-sm-1">
                                <AdminStockAddStockButton product={product} index={index} modalActive={modalActive} base={this} />
                            </div>
                            <div className="col-sm-12">
                                <hr />
                                <AdminStockProgressBar stock={stock} />
                            </div>
                        </div>
                        <AdminStockAddStockModal product={product} index={index} base={this} />
                    </div>
                </div>
            </div>
        );
    }
}