//node imports
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { productActions } from '../_actions';

import '../styling/SingleProductStyle.css';

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
                        <nav class="path-nav" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link to="/home">Home</Link></li>
                                <li class="breadcrumb-item"><Link to="/products">Products</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">{product.items.name}</li>
                            </ol>
                        </nav>
                    <div className="SingleProduct">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="img-container">
                                    <img src={product.items.imageUrl} alt="" />
                                </div>
                            </div>
                            <div className="col-md-7">
                                <h2>{product.items.name}</h2>
                                <h3>{product.items.price},-</h3>
                                <div className="button-group">
                                    <button className="btn btn-success">Add to cart</button>
                                    <button className="btn btn-info">Add to wishlist</button>
                                </div>
                                <p>{product.items.description}</p>
                            </div>
                        </div>
                    </div>
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