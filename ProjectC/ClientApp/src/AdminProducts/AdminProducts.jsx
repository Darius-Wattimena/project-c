//node imports
import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { productActions } from '../_actions';
import { history } from '../_helpers';

//base class
class AdminProducts extends React.Component {
    componentDidMount() {
        this.props.dispatch(productActions.getAll());
    }

    handleEditProduct(id) {
        history.push("/admin/product/edit/" + id);
    }

    handleDeleteProduct(id) {
        this.props.dispatch(productActions._delete(id));
    }

    render() {
        const { products } = this.props;
        return (
            <div className="panel col-md-8">
                <h3>Products</h3>
                {products.loading && <em>Loading products...</em>}
                {products.error && <span className="text-danger">ERROR: {products.error}</span>}
                {products.items &&
                    <div>
                        <table className="table table-hover">
                            <thead className="thead-dark">
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
                                <tr key={index}>
                                    <td scope="row">{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <Link disabled={product.deleting} className="btn btn-primary" to={`/admin/editproduct/${product.id}`}>
                                            <span className="far fa-edit"></span>&nbsp;
                                            Edit
                                        </Link>
                                        <button disabled={product.deleting} className="btn btn-danger" onClick={this.handleDeleteProduct.bind(this,product.id)}>
                                            <span className="fas fa-trash"></span>&nbsp;
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                    
                                )}
                            </tbody>
                        </table>
                        <Link to="/admin/addproduct" className="btn btn-primary">Add a product</Link>
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