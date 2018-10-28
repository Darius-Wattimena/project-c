//node imports
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { productActions } from '../_actions';

import '../styling/ProductListingStyle.css';
import { history } from '../_helpers';

var vertical = false;

function onClick(e) {
    vertical = !vertical;
    history.push("/products");
}

function Listing(props) {
    const products = props.products;
    const vertical = props.vertical
    if (vertical) {
        return (<VerticalListing products={products} />);
    }
    else {
        return (<HorizontalListing products={products} />);
    }
}

function CartButton() {
    return (
        <button class="btn cartbutton">Add to cart</button>
    );
}

function HorizontalListing(props) {
    const products = props.products;
    return (
        <div>
            {products.map((product, index) =>
                <div className="product-item">
                    <Link to={`/product/${product.id}`}>
                        <img src={product.imageUrl}></img>
                        <h4>{product.name}</h4>
                    </Link>
                    <h3>{product.price},-</h3>
                    <CartButton />
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
                        <CartButton />
                    </div>
                </div>
            )}
        </div>
    );
}


//base class
class ProductPage extends React.Component {


    componentDidMount() {
        this.props.dispatch(productActions.getAll());
    }

    render() {
        console.log(this.props);
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
                </div>
                <div class="products-container col-sm-9">
                    <nav class="navbar navbar-dark bg-info">
                        <ul class="navbar-nav">
                            <li class="nav-right active">
                                <a class="nav-link" onClick={onClick}>Switch View</a>
                            </li>
                        </ul>
                    </nav>
                    {products.loading && <em>Loading products...</em>}
                    {products.error && <span className="text-danger">ERROR: {products.error}</span>}
                    {products.items && <Listing products={products.items} vertical={vertical} />}
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

const connectedProductPage = connect(mapStateToProps)(ProductPage);
export { connectedProductPage as ProductPage };