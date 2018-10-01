//node imports
import React from 'react';
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
        console.log({ products });
        return (
            <div>
            {products.items &&
                <div>
                {products.items.map((product, index) => 
                        <div class="product">
                            <img></img>
                            <h4>{product.name}</h4>
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