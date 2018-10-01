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
        const { products } = this.props;
        return (
            <div>
                {products.items &&
                    <p>{products.items.name}</p>
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

const connectedProductPage = connect(mapStateToProps)(SingleProductPage);
export { connectedProductPage as SingleProductPage };