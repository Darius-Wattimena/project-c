import React from 'react';
import {connect} from 'react-redux';
import { history } from '../_helpers';

class AddToCartConfirmModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
        
        this.redirect = this.redirect.bind(this);
    }

    redirect() {
        history.push("/checkout");
    }

    render() {

        const product = this.props.product;
        const isDisabled = this.props.disabled;

        return (
            <div className="modal show" id={`AddToCartConfirmModal`} tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6 text-center">
                                    {product && <img
                                        src={product.imageUrl ? product.imageUrl : 'https://www.elite-electronics.com.au/images/yamaha/imagenotavailable.png'}
                                        style={{width: '7.5em'}}/>}
                                </div>
                                <div className="col-md-6">
                                    {product && <p>{product.name} has been added to your shopping cart.</p>}
                                    <button disabled={isDisabled} className="btn btn-primary" data-dismiss="modal" onClick={this.redirect}>
                                        View shopping cart
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {} = state;
    return {};
}

const connectedPage = connect(mapStateToProps)(AddToCartConfirmModal);
export {connectedPage as AddToCartConfirmModal};