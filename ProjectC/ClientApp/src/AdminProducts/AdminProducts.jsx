//node imports
import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
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
            <div class="panel col-md-8">
                <h3>Products</h3>
                {products.loading && <em>Loading products...</em>}
                {products.error && <span className="text-danger">ERROR: {products.error}</span>}
                {products.items &&
                    <table class="table table-hover">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Price</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
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
                    </tbody>
                        <Link to="/adminpanel/addproduct">Add a product</Link>
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