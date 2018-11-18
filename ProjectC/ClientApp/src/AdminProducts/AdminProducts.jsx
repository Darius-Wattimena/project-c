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
                    <div>
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
                                    <td></td>
                                </tr>
                                    
                                )}
                            </tbody>
                        </table>
                        <Link to="/adminpanel/addproduct" class="btn btn-primary">Add a product</Link>
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

const connectedProductPage = connect(mapStateToProps)(AdminProducts);
export { connectedProductPage as AdminProducts };