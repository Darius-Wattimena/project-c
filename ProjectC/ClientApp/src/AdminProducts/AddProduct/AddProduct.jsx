import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../styling/form.css';

import { productActions } from '../../_actions';

class AddProduct extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            product: {
                name: "",
                stock: 0,
                price: 0,
                imageurl: "",
                description: ""
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

        // Update the value of the property that was changed
        this.setState({
            product: {
                ...product,
                [name]: value
            }
        });
    }

    render() {
        // Render the view
        return (
            <div class="panel col-md-8">
            <div className='adminPanel' class="container">

                
                <form id="product" onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <h3>Add Products</h3>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" name="name" id="name" placeholder="Name" />
                    </div>
                    <div class="form-group">
                        <label for="stock">Stock</label>
                        <input type="number" min="0" step="1" class="form-control" name="stock" id="stock" placeholder="Stock" defaultValue="0" />
                    </div>
                    <div class="form-group">
                        <label for="price">Price</label>
                        <input type="number" min="0.01" step="0.01" class="form-control" name="price" id="price" placeholder="Price" defaultValue="0" />
                    </div>
                    <div class="form-group">
                        <label for='image'>Image URL</label>
                        <input type="text" class="form-control" name="imageurl" id="imageurl" placeholder="Link to an image" />
                    </div>
                    <div class="form-group">
                        <label for='description'>Description</label>
                        <input type="text" class="form-control" name="description" id="description" placeholder="Description of the product" />
                    </div>
                    <button type="submit" class="btn btn-primary">Add</button>
                    <a href="/adminpanel/product" className="btn btn-danger">Back</a>
                </form>
                </div>
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