//node imports
import React from 'react';
import { connect } from 'react-redux';

import { productActions } from '../_actions';

import '../styling/ProductListingStyle.css';

//base class
class SingleProductPage extends React.Component {

    componentDidMount() {
        this.props.dispatch(productActions.getById(this.props.match.params.id));
    }
    
    render() {
        const { product } = this.props;
        console.log(product.items)
        return (
            <div>
                {product.items &&
                    <div>
                    <h2>{product.items.name}</h2>
                    <img src={product.items.imageUrl} alt=""/>
                    <h3>{product.items.price},-</h3>
                    <p>{product.items.description}</p>
                    </div>
                }
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { product } = state;
    return {
        product
    };
}

const connectedProductPage = connect(mapStateToProps)(SingleProductPage);
export { connectedProductPage as SingleProductPage };