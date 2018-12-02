import React from 'react';
import { connect } from 'react-redux';

import { productActions } from '../../_actions';

class AdminStockAddStockModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startStock: props.product.stock,
            newStock: props.product.stock,
            submitted: false
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
        const { dispatch, product, base, index } = this.props;

        if (newStock && startStock !== newStock && newStock > -1) {
            dispatch(productActions.changeStock(product, newStock, base));
            document.getElementById("adminStockModalHideButton" + index).click();
        }
    }

    render() {
        const { index, product, base } = this.props;
        const { submitted } = this.state;
        return (
            <div className="modal fade" id={`Modal${index}`} tabindex="-1" role="dialog" aria-labelledby={`ModalCenterTitle`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`ModalCenterTitle`}>{product.name} Change Stock</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input className="form-control" type="number" value={this.state.newStock} onChange={this.handleChange} />
                            {this.state.newStock < 0 &&
                                <div className="help-block">Stock count must be 0 or higher</div>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={base.onCloseModal.bind(base)}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                            <button id={`adminStockModalHideButton${index}`} type="button" data-dismiss="modal" style={{display: `none`}} />
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