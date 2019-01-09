//node imports
import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { productActions } from '../_actions';
import { history } from '../_helpers';

//base class
class AdminProducts extends React.Component {
    componentDidMount() {
        this.props.dispatch(productActions.getAllAdmin());
    }

    handleEditProduct(id) {
        history.push("/admin/product/edit/" + id);
    }

    handleDeleteProduct(id) {
        this.props.dispatch(productActions._delete(id));
    }

    handleRecoverProduct(id) {
        this.props.dispatch(productActions.recover(id));
    }

    render() {
        const { products } = this.props;
        return (
            <div className="admin-panel panel col-10">
                <h3>Product Management</h3>
                <hr />
                {products.loading &&
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                }
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
                                        <td style={{ textDecoration: (!product.active ? `line-through` : `none`) }} scope="row">{product.id}</td>
                                        <td style={{ textDecoration: (!product.active ? `line-through` : `none`) }} > {product.name}</td>
                                        <td style={{ textDecoration: (!product.active ? `line-through` : `none`) }} > {product.stock}</td>
                                        <td style={{ textDecoration: (!product.active ? `line-through` : `none`) }} > {product.price}</td>
                                        <td>
                                            <Link disabled={product.deleting} className="btn btn-primary" to={`/admin/editproduct/${product.id}`}>
                                                <span className="far fa-edit"></span>&nbsp;
                                                Edit
                                        </Link>
                                            {
                                                product.active
                                                &&
                                                <button disabled={product.deleting} className="btn btn-danger" onClick={this.handleDeleteProduct.bind(this, product.id)}>
                                                    <span className="fas fa-trash"></span>&nbsp;
                                                    Delete
                                                </button>
                                                ||
                                                <button disabled={product.deleting} className="btn btn-success" onClick={this.handleRecoverProduct.bind(this, product.id)}>
                                                    <span className="fas fa-undo"></span>&nbsp;
                                                    Recover
                                                </button>
                                            }
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