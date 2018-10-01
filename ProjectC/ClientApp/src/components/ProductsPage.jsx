//node imports
import React from 'react';
import { connect } from 'react-redux';

import { productActions } from '../_actions';
import data from '../data/products.json';

//component imports
import Listproducts from '../features/productListing';

//base class
class ProductPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(productActions.getAll());
    }
   
    render() {
        const { products } = this.props;
        console.log({ products });
        return (
            <div className='productPage'>
                <Listproducts data={data} />
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