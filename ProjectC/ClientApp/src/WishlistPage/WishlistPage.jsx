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
    console.log(window.component.props);
    return (
        <button class="btn cartbutton" onClick={window.component.props.addProduct.bind(this, props.product)}>
            Add to cart
        </button>
    );
}

class WishlistPage extends React.Component {
    componentDidMount() {


        this.props.getAllProducts();
    }

    handleAdd(product) {
        console.log("Adding product " + product.name + " to the shopping basket");
        this.props.addProduct(product);
        this.forceUpdate();
    }

    handleRemove(product) {
        this.props.removeProduct(product);
        // re-render
        this.forceUpdate();
    }


    constructor(props) {
        super(props);
        window.component = this;
    }



    render() {
        const { products } = this.props;

        return (

            <div>
                <h3>Wishlist</h3>
                <div>
                    <div className="wishlistbutton-group">
                        <button className="btn btn-info">Create wishlist</button>
                    </div>

                    {products.items && products.items.map((product, index) =>
                        <div className="wishlist-item row">
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
                                <CartButton product={product} />
                                <button className="btn btn-danger" onClick={this.handleRemove.bind(this, product)}>Remove</button>
                            </div>

                        </div>
                    )}


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
        addProduct: product => { dispatch(shoppingCartActions.addProduct(product)); window.alert(product.name + " was added to the shopping cart! (TEST)"); console.log("Added product to the basket."); },
        removeProduct: product => dispatch(wishlistActions.removeProduct(product)),
    }
};

const connectedWishlistPage = connect(mapStateToProps, mapDispatchToProps)(WishlistPage);
export { connectedWishlistPage as WishlistPage };

