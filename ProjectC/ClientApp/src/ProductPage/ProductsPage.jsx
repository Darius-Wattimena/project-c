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
    if (vertical) {
        return (<VerticalListing products={products} />);
    }
    else {
        return (<HorizontalListing products={products} />);
    }
}

function CartButton(props) {
    return (
        <button class="btn cartbutton" onClick={window.component.props.addProduct.bind(this, props.product)}>
            Add to cart
        </button>
    );
}

function HorizontalListing(props) {
    const products = props.products;
    return (
        <div>
            {products.map((product, index) =>
                <div className="product-item" key={index}>
                    <Link to={`/product/${product.id}`}>
                        <img src={product.imageUrl}></img>
                        <h4>{product.name}</h4>
                    </Link>
                    <h3>{product.price},-</h3>
                    <CartButton product={product} />
                </div>
            )}
        </div>
    );
}

function VerticalListing(props) {
    const products = props.products;
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
                        <p>stock: {product.stock}</p>
                        <h3>{product.price},-</h3>
                        <CartButton product={product} />
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

        // Make component accessible
        window.component = this;

        this.state = {
            filters: {}
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

    setFilters(filters) {
        // Set filters in state
        this.setState({
            filters: filters
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
                            <FilterColumn products={products.items} setFilters={this.setFilters.bind(this)} />
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
                            <Listing products={
                            // If any filters are enabled
                            products.items.some(p => p.specifications.some(s => this.state.filters[s.name] && this.state.filters[s.name][s.value] && this.state.filters[s.name][s.value]))
                            &&
                            // Pass filtered products
                            products.items.filter(p => p.specifications.some(s => this.state.filters[s.name] && this.state.filters[s.name][s.value] && this.state.filters[s.name][s.value]))
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
    const { products } = state;
    return {
        products
    };
}

// Map actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        search: searchValue => dispatch(productActions.search(searchValue)),
        // accessible via this.props.getAllProducts
        getAllProducts: () => dispatch(productActions.getAll()),

        // this.props.addProduct
        addProduct: product => { dispatch(shoppingCartActions.addProduct(product)); window.alert(product.name + " was added to the shopping cart! (TEST)"); console.log("Added product to the basket."); },
    }
};

const connectedProductPage = connect(mapStateToProps, mapDispatchToProps)(ProductPage);
export { connectedProductPage as ProductPage };