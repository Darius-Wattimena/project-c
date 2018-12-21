//node imports
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { productActions } from '../_actions';
import { shoppingCartActions } from '../_actions/shoppingCart.actions';

import '../styling/progress-indicator.css';
import '../styling/ProductListingStyle.css';
import { history } from '../_helpers';

import { FilterColumn } from '../ProductPage';
import { formatCurrency } from '../_helpers/currency-format';

import { AddToCartConfirmModal } from '../ShoppingCart/AddToCartConfirmModal'

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
    var isAddingThis = (base.props.shoppingCart.adding &&
        base.props.shoppingCart.adding.productId === props.product.id);

    return (
        <button
            className="btn btn-success cartbutton"
            onClick={base.handleAdd.bind(base, props.product)}
            data-toggle="modal"
            data-target={`#AddToCartConfirmModal`}>
            Add to cart
            {
                isAddingThis
                &&
                <span>
                    &nbsp;
                    <i className="fas fa-circle-notch"></i>
                </span>
            }
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
                        <img src={product.imageUrl ? product.imageUrl : 'https://www.elite-electronics.com.au/images/yamaha/imagenotavailable.png'} />
                        <h4>{product.name}</h4>
                    </Link>
                    <h3>{formatCurrency(product.price)}</h3>
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
                            <img src={product.imageUrl ? product.imageUrl : 'https://www.elite-electronics.com.au/images/yamaha/imagenotavailable.png'} />
                        </Link>
                    </div>
                    <div className="col-sm-7">
                        <Link to={`/product/${product.id}`}>
                            <h4>{product.name}</h4>
                        </Link>
                        <br />
                        <h3>{formatCurrency(product.price)}</h3>
                        <CartButton base={base} product={product} />
                        {
                            product.specifications.length != 0
                            &&
                            <div className="vspecs">
                                <h5>Specifications</h5>
                                <table className="table table-sm">
                                    {product.specifications.map((spec, index) =>
                                        index < 3
                                        &&
                                        <tr key={index}>
                                            <td><b>{spec.name}</b></td>
                                            <td>{spec.value}</td>
                                        </tr>
                                        ||
                                        <tr className={`collapse colspec${product.id}`}>
                                            <td><b>{spec.name}</b></td>
                                            <td>{spec.value}</td>
                                        </tr>
                                    )}
                                </table>

                                <button className="btn colspecBtn collapsed" data-target={`.colspec${product.id}`} data-toggle="collapse" type="button">
                                    <span className="ifCollapsed">
                                        <i className="fas fa-eye" />
                                        &nbsp;Show all specifications
                                    </span>
                                    <span className="else">
                                        <i className="fas fa-eye-slash" />
                                        &nbsp;Show less specifications
                                    </span>
                                </button>
                            </div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

function VerticalViewButton(props) {
    return (<div ><i className="fas fa-th"></i> Switch To Horizontal</div>);
}

function HorizontalViewButton(props) {
    return (<div ><i className="fas fa-align-justify"></i> Switch To Vertical</div >);
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

        this.addedProduct = null;
    }

    // Adding quantity (or new product)
    handleAdd(product) {
        this.props.addProduct(product);
        this.addedProduct = product;
    }

    componentDidMount() {
        if (!this.props.match.params.nr) {

            // Only load if no products in state
            if (this.props.products && !this.props.products.loaded) {
                this.props.getAllProducts();
            }

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
                <nav className="path-nav" aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                        <li className="breadcrumb-item active">Products</li>
                    </ol>
                </nav>
                <div className="row">
                    <div className="filters-container col-sm-3">
                        <nav className="navbar navbar-dark bg-info">
                            <a className="nav-link">Filters</a>
                        </nav>
                        {
                            products.items &&
                            <FilterColumn products={products.items} setFilteredProducts={this.setFilteredProducts.bind(this)} />
                            ||
                            <div className="progress">
                                <div className="indeterminate"></div>
                            </div>
                        }
                    </div>
                    <div className="products-container col-sm-9">
                        <nav className="navbar navbar-dark bg-info">
                            <ul className="navbar-nav">
                                <li className="nav-right active">
                                    <a className="btn btn-light" onClick={onClick}>
                                        <SwitchViewButton vertical={vertical} />
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        {products.loading &&
                            <div className="progress">
                                <div className="indeterminate"></div>
                            </div>
                        }
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

                <AddToCartConfirmModal product={this.addedProduct} />

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