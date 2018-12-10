//node imports
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { productActions } from '../_actions';
import { shoppingCartActions } from '../_actions/shoppingCart.actions';

import '../styling/SingleProductStyle.css';
import { StockBlock } from '../ProductPage/StockBlock';

//base class
class SingleProductPage extends React.Component {

    componentDidMount() {
        this.props.getProductById(this.props.match.params.id);
    }

    // Adding quantity (or new product)
    handleAdd(product) {
        console.log("Adding product " + product.name + " to the shopping basket");
        this.props.addProduct(product);
    }

    render() {
        const { product } = this.props;
        return (
            <div>
                {product.item &&
                    <div>
                        <nav class="path-nav" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link to="/home">Home</Link></li>
                                <li class="breadcrumb-item"><Link to="/products">Products</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">{product.item.name}</li>
                            </ol>
                        </nav>
                        <div className="SingleProduct">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="img-container">
                                        <img src={product.item.imageUrl ? product.item.imageUrl : 'https://www.elite-electronics.com.au/images/yamaha/imagenotavailable.png'} />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <h2>{product.item.name}</h2>
                                    <h3>{product.item.price},-</h3>
                                    <StockBlock stock={product.item.stock} />
                                    <div className="button-group">
                                        <button disabled={(this.props.shoppingCart.adding && this.props.shoppingCart.adding.productId === product.item.id
                                        )}
                                            className="btn btn-success" onClick={this.handleAdd.bind(this, product.item)}>Add to cart</button>
                                        <button className="btn btn-info">Add to wishlist</button>
                                    </div>
                                    <p>{product.item.description}</p>
                                </div>


                                {
                                    // Specifications
                                    product.item.specifications &&
                                    <table class="table table-hover" style={{ margin: 1 + "em" }}>
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Specificaties</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.item.specifications.map((spec, index) =>
                                                <tr>
                                                    <td scope="row">{spec.name}</td>
                                                    <td>{spec.value}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { product, shoppingCart } = state;
    return {
        product,
        shoppingCart
    };
}

// Map actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        getProductById: id => { dispatch(productActions.getById(id)); },
        addProduct: product => { dispatch(shoppingCartActions.addProduct(product)); },
    }
};

const connectedProductPage = connect(mapStateToProps, mapDispatchToProps)(SingleProductPage);
export { connectedProductPage as SingleProductPage };