import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { productActions } from '../../_actions';

class AddProduct extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            product: {
                name: "",
                price: 0
            },
            submitted: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const { product } = this.state;
        const { dispatch } = this.props;

        // Add the product
        dispatch(productActions.add(product));
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { product } = this.state;
        this.setState({
            product: {
                ...product,
                [name]: value
            }
        });
    }

    render() {
        return (
            <div className='adminPanel' class="col-md-4">
                <form id="product" onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" name="name" id="name" placeholder="Name" />
                    </div>
                    <div class="form-group">
                        <label for="price">Price</label>
                        <input type="number" min="0.01" step="0.01" class="form-control" name="price" id="price" placeholder="Price" defaultValue="0" />
                    </div>
                    <div class="form-group">
                        <label for='specifications'>Specifications <span class="text-danger">(not implemented yet)</span></label>
                        <input type="text" class="form-control" id="specifications" placeholder="?" />
                    </div>
                    <button type="submit" class="btn btn-primary">Add</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { s } = state;
    return {
        s
    };
}

const connectedAddProduct = connect(mapStateToProps)(AddProduct);
export { connectedAddProduct as AddProduct };