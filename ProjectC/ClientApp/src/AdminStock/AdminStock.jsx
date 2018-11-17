//node imports
import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { productActions } from '../_actions';

//base class
class AdminStock extends React.Component {
    componentDidMount() {
        this.props.dispatch(productActions.getAll());
    }

    handleDeleteProduct(id) {
        return (e) => this.props.dispatch(productActions._delete(id));
    }

    render() {
        const { products } = this.props;
        return (
            <div class="panel col-md-8">
                <h3>Products Stock</h3>
                {products.loading && <em>Loading products...</em>}
                {products.error && <span className="text-danger">ERROR: {products.error}</span>}
                {products.items &&
                    <div>
                        <div class="accordion" id="accordionExample">
                            {products.items.map((product, index) =>
                                <div class="card">
                                    <div class="card-header" id={`heading${index}`} data-toggle="collapse" data-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                                        <h5 class="mb-0">
                                            <button class="btn btn-link collapsed" type="button">
                                                {product.name}
                                            </button>
                                        </h5>
                                    </div>
                                    <div id={`collapse${index}`} class="collapse" aria-labelledby={`heading${index}`} data-parent="#accordionExample">
                                        <div class="card-body">
                                            Test
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                }
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { products } = state;
    return {
        products
    };
}

const connectedPage = connect(mapStateToProps)(AdminStock);
export { connectedPage as AdminStock };