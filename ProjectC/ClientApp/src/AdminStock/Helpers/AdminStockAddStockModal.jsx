import React from 'react';
import { connect } from 'react-redux';

import { productActions } from '../../_actions';

class AdminStockAddStockModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startStock: props.product.stock,
            newStock: props.product.stock
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            newStock: event.target.value
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        const { newStock, startStock } = this.state;
        const { dispatch, product, base } = this.props;

        if (newStock && startStock !== newStock) {
            dispatch(productActions.changeStock(product, newStock, base));
        }
    }

    render() {
        const { index, product } = this.props;
        return (
            <div class="modal fade" id={`Modal${index}`} tabindex="-1" role="dialog" aria-labelledby={`ModalCenterTitle`} aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id={`ModalCenterTitle`}>{product.name} Change Stock</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <input type="number" value={this.state.newStock} onChange={this.handleChange} />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { } = state;
    return {
        
    };
}

const connectedPage = connect(mapStateToProps)(AdminStockAddStockModal);
export { connectedPage as AdminStockAddStockModal };