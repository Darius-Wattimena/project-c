//node imports
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { productActions } from '../_actions';

import '../styling/ProductListingStyle.css';

//base class
class ProductPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(productActions.getAll());
    }
   
    render() {
        const { products } = this.props;
        return (
            <div>
            {products.loading && <em>Loading products...</em>}
            {products.error && <span className="text-danger">ERROR: {products.error}</span>}
            {products.items &&
                <div>
                {products.items.map((product, index) => 
                    <div className="product">
                        <Link to={`/product/${product.id}`}>
                            <img src={product.imageUrl}></img>
                            <h4>{product.name}</h4>
                        </Link>
                        <p>stock: {product.stock}</p>
                        <h3>{product.price},-</h3>
                    </div>
                )}
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

const connectedProductPage = connect(mapStateToProps)(ProductPage);
export { connectedProductPage as ProductPage };