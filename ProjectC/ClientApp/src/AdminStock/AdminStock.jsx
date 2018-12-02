//node imports
import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { productActions } from '../_actions';

import { AdminStockItem } from "./Helpers";

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
            <div className="panel col-md-8 admin-stock">
                <h3>Products Stock</h3>
                {products.loading && <em>Loading products...</em>}
                {products.error && <span className="text-danger">ERROR: {products.error}</span>}
                {products.items &&
                    <div>
                    <div className="accordion" id="stockAccordion">
                            {products.items.map((product, index) =>
                                <AdminStockItem product={product} index={index} stock={product.stock} />
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