//node imports
import React from 'react';
import { connect } from 'react-redux';

import { productActions } from '../_actions';

//base class
class AdminProducts extends React.Component {
    componentDidMount() {
        this.props.dispatch(productActions.getAll());
    }

    handleDeleteProduct(id) {
        return (e) => this.props.dispatch(productActions._delete(id));
    }

    render() {
        const { products } = this.props;
        return (
            <div>
                {products.loading && <em>Loading products...</em>}
                {products.error && <span className="text-danger">ERROR: {products.error}</span>}
                {products.items &&
                    <table class="table">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Price</th>
                            <th scope="col">Actions</th>
                        </tr>
                    {products.items.map((product, index) =>
                        <tr>
                            <td scope="row">{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.stock}</td>
                            <td>{product.price}</td>
                            <td>{
                                product.deleting ? <em> - Deleting...</em>
                                    : product.deleteError ? <span className="text-danger"> - ERROR: {product.deleteError}</span>
                                        : <span> Edit - <a onClick={this.handleDeleteProduct(product.id)}>Delete</a></span>
                            }</td>
                        </tr>
                            
                    )}
                    <a href="/adminpanel/addproduct">Add a product</a>
                    </table>
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

const connectedProductPage = connect(mapStateToProps)(AdminProducts);
export { connectedProductPage as AdminProducts };