//node imports
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { productActions } from '../_actions';
import { shoppingCartActions } from '../_actions/shoppingCart.actions';

import '../styling/ProductListingStyle.css';
import { history } from '../_helpers';

import { FilterColumn } from '../ProductPage';

var vertical = false;

function onClick(e) {
    vertical = !vertical;
    history.push("/products");
}
function Listing(props) {
    const products = props.products;
    const vertical = props.vertical;
    const base = props.base;

    if (vertical) {
        return (<VerticalListing base={base} products={products} />);
    }
    else {
        return (<HorizontalListing base={base} products={products} />);
    }
}

function CartButton(props) {
    var base = props.base;

    return (
        <button
            disabled={(base.props.shoppingCart.adding && base.props.shoppingCart.adding.productId === props.product.id
            )}
            class="btn cartbutton" onClick={base.props.addProduct.bind(this, props.product)}>
            Add to cart
        </button>
    );
}

function HorizontalListing(props) {
    const products = props.products;
    const base = props.base;
    return (
        <div>
            {products.map((product, index) =>
                <div className="product-item" key={index}>
                    <Link to={`/product/${product.id}`}>
                        <img src={product.imageUrl}></img>
                        <h4>{product.name}</h4>
                    </Link>
                    <h3>{product.price},-</h3>
                    <CartButton base={base} product={product} />
                </div>
            )}
        </div>
    );
}

function VerticalListing(props) {
    const products = props.products;
    const base = props.base;
    return (
        <div>
            {products.map((product, index) =>
                <div className="product-itemv row">
                    <div className="col-sm-5">
                        <Link to={`/product/${product.id}`}>
                            <img src={product.imageUrl}></img>
                        </Link>
                    </div>
                    <div className="col-sm-7">
                        <h4>{product.name}</h4>
                        <br />
                        <h3>{product.price},-</h3>
                        <CartButton base={base} product={product} />
                        <br />
                        <br />
                        <h5>Specifications</h5>
                        {product.specifications.map((spec, index) =>
                            <div className="row" key={index}>
                                <div className="col-sm-4">{spec.name}</div>
                                <div className="col-sm-7">{spec.value}</div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function VerticalViewButton(props) {
    return (<div ><i class="fas fa-th"></i> Switch To Horizontal</div>);
}

function HorizontalViewButton(props) {
    return (<div ><i class="fas fa-align-justify"></i> Switch To Vertical</div >);
}

function SwitchViewButton(props) {
    const vertical = props.vertical;

    if (vertical) {
        return (<VerticalViewButton />);
    }
    else {
        return (<HorizontalViewButton />);
    }
}

//base class
class ProductPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filteredProducts: null
        };
    }

    // Adding quantity (or new product)
    handleAdd(product) {
        this.props.addProduct(product);
        this.forceUpdate();
    }

    componentDidMount() {
        if (!this.props.match.params.nr) {
            this.props.getAllProducts();
        }
    }

    setFilteredProducts(products) {
        // Set filters in state
        this.setState({
            filteredProducts: products
        });
    }

    render() {
        const { products } = this.props;

        return (
            <div>
                <nav class="path-nav" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to="/home">Home</Link></li>
                        <li class="breadcrumb-item active">Products</li>
                    </ol>
                </nav>
                <div className="row">
                    <div class="filters-container col-sm-3">
                        <nav class="navbar navbar-dark bg-info">
                            <a class="nav-link">Filters</a>
                        </nav>
                        {
                            products.items &&
                            <FilterColumn products={products.items} setFilteredProducts={this.setFilteredProducts.bind(this)} />
                        }
                    </div>
                    <div class="products-container col-sm-9">
                        <nav class="navbar navbar-dark bg-info">
                            <ul class="navbar-nav">
                                <li class="nav-right active">
                                    <a class="btn btn-light" onClick={onClick}>
                                        <SwitchViewButton vertical={vertical} />
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        {products.loading && <em>Loading products...</em>}
                        {products.error && <span className="text-danger">ERROR: {products.error}</span>}
                        {products.items &&
                            <Listing base={this} products={
                                // If products have been filtered
                                this.state.filteredProducts != null
                                &&
                                // Pass filtered products
                                this.state.filteredProducts
                                ||
                                // Otherwise, pass unfiltered products
                                products.items
                            } vertical={vertical} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { products, shoppingCart } = state;
    return {
        products,
        shoppingCart
    };
}

// Map actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        search: searchValue => dispatch(productActions.search(searchValue)),
        // accessible via this.props.getAllProducts
        getAllProducts: () => dispatch(productActions.getAll()),

        // this.props.addProduct
        addProduct: product => { dispatch(shoppingCartActions.addProduct(product)); }
    }
};

const connectedProductPage = connect(mapStateToProps, mapDispatchToProps)(ProductPage);
export { connectedProductPage as ProductPage };