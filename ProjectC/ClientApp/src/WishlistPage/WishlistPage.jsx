import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { productActions } from '../_actions';
import { history } from '../_helpers';
import { shoppingCartActions } from '../_actions/shoppingCart.actions';
import { wishlistActions } from '../_actions/wishlist.actions';
import '../styling/WishlistStyling.css';


function CartButton(props) {
    return (
        <button class="btn cartbutton" onClick={props.base.props.addProduct.bind(this, props.product)}>
            Add to cart
        </button>
    );
}

class WishlistPage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Load
        this.props.getAllProducts();
    }

    handleAdd(product) {
        this.props.addProduct(product);
    }

    handleRemove(product) {
        this.props.removeProduct(product);
    }

    render() {
        const { products } = this.props;

        return (

            <div>
                <div className="row">
                    <div className="col-md-2">
                        <h4>My wishlists</h4>
                        <hr />
                        <button className="btn btn-info btn-block">Create wishlist</button>
                    </div>
                    <div className="col-md-10">
                        {products.items && products.items.map((product, index) =>
                            <div className="wishlist-item row" key="{index}">
                                <div className="col-sm-3">

                                    <Link to={`/product/${product.id}`}>

                                        <div className="wishlist-image">
                                            <img src={product.imageUrl}></img>
                                        </div>

                                    </Link>
                                </div>
                                <div className="col-sm-9">
                                    <h4>{product.name}</h4>
                                    <h3>{product.price},-</h3>
                                    <CartButton product={product} base={this} />
                                    <button className="btn btn-danger" onClick={this.handleRemove.bind(this, product)}>Remove</button>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
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

const mapDispatchToProps = (dispatch) => {
    return {
        // accessible via this.props.getAllProducts
        getAllProducts: () => dispatch(productActions.getAll()),
        addProduct: product => { dispatch(shoppingCartActions.addProduct(product)); }
    }
};

const connectedWishlistPage = connect(mapStateToProps, mapDispatchToProps)(WishlistPage);
export { connectedWishlistPage as WishlistPage };

