import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../styling/form.css';

import { productActions, alertActions } from '../../_actions';

class EditProduct extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            product: {
                name: "",
                stock: 0,
                price: 0,
                imageUrl: "",
                description: ""
            },
            specifications: [
                { id: 0, name: "merk", value: "" },
                { id: 0, name: "os", value: "" },
                { id: 0, name: "geheugen", value: "" },
                { id: 0, name: "grootte", value: "" },
                { id: 0, name: "camera", value: "" },
                { id: 0, name: "opslag", value: "" },
                { id: 0, name: "kleur", value: "" },
                { id: 0, name: "resolutie", value: "" },
                { id: 0, name: "schermGrootte", value: "" },
                { id: 0, name: "gewicht", value: "" },
                { id: 0, name: "processor", value: "" },
                { id: 0, name: "accu", value: "" },
                { id: 0, name: "simlockVrij", value: "" },
                { id: 0, name: "microSD", value: "" },
                { id: 0, name: "internetType", value: "" },
                { id: 0, name: "dualSim", value: "" }
            ],
            submitted: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.loading = true; // Haven't loaded the product yet
    }

    componentDidMount() {
        // Load the product and store it in the state
        productActions.loadById(this.props.match.params.id).then(
            product => {
                this.setState({
                    'product': {
                        id: product.id,
                        name: product.name,
                        stock: product.stock,
                        price: product.price,
                        imageUrl: product.imageUrl,
                        description: product.description
                    },
                    'specifications': product.specifications
                }
                );

                this.loading = false;
                this.forceUpdate();
                console.log("LOADED");
            },
            error => {
                alertActions.error(error);
            }
        );
    }

    handleSubmit(event) {
        event.preventDefault();

        const { product, specifications } = this.state;

        // Update the product
        this.props.updateProduct(product, specifications);
    }

    handleChange(event) {

        const { name, value } = event.target;
        const { product, specifications } = this.state;

        var addSpec = false;

        for (var i in specifications) {
            if (specifications[i].name === name) {
                specifications[i].value = value;
                addSpec = true;
                break;
            }
        }

        // Update the value of the property that was changed
        if (addSpec) {
            this.setState({
                specifications
            });
        } else {
            this.setState({
                product: {
                    ...product,
                    [name]: value
                }
            });
        }
    }

    render() {

        const productState = this.props.product;

        // Render the view
        return (
            <div className="admin-panel panel col-md-10">
                <div className='col-md-6'>
                    {
                        this.loading === true
                        &&
                        <div className="progress">
                            <div className="indeterminate"></div>
                        </div>
                        ||
                        <form id="product" onSubmit={this.handleSubmit} onChange={this.handleChange}>
                            <h3>Editing {this.state.product.name}</h3>
                            <div className="form-group">
                                <label for="name">Name</label>
                                <input value={this.state.product.name} type="text" className="form-control" name="name" id="name" placeholder="Name" />
                            </div>
                            <div className="form-group">
                                <label for="stock">Stock</label>
                                <input value={this.state.product.stock} type="number" min="0" step="1" className="form-control" name="stock" id="stock" placeholder="Stock" defaultValue="0" />
                            </div>
                            <div className="form-group">
                                <label for="price">Price</label>
                                <input value={this.state.product.price} type="number" min="0.01" step="0.01" className="form-control" name="price" id="price" placeholder="Price" defaultValue="0" />
                            </div>
                            <div className="form-group">
                                <label for='image'>Image URL</label>
                                <input value={this.state.product.imageUrl} type="text" className="form-control" name="imageUrl" id="imageUrl" placeholder="Link to an image" />
                            </div>
                            <div className="form-group">
                                <label for='description'>Description</label>
                                <input value={this.state.product.description} type="text" className="form-control" name="description" id="description" placeholder="Description of the product" />
                            </div>

                            <h3>Add Specifications</h3>
                            <div className="form-group">
                                <label for="merk">Merk</label>
                                <input value={this.state.specifications[0].value} type="text" className="form-control" name="merk" id="merk" placeholder="Merk" />
                            </div>
                            <div className="form-group">
                                <label for="os">Operating System</label>
                                <input value={this.state.specifications[1].value} type="text" className="form-control" name="os" id="os" placeholder="OS" />
                            </div>
                            <div className="form-group">
                                <label for="geheugen">Geheugen</label>
                                <input value={this.state.specifications[2].value} type="text" className="form-control" name="geheugen" id="geheugen" placeholder="Geheugen" />
                            </div>
                            <div className="form-group">
                                <label for="grootte">Telefoon Groote</label>
                                <input value={this.state.specifications[3].value} type="text" className="form-control" name="grootte" id="grootte" placeholder="Groote" />
                            </div>
                            <div className="form-group">
                                <label for="camera">Camera</label>
                                <input value={this.state.specifications[4].value} type="text" className="form-control" name="camera" id="camera" placeholder="Camera" />
                            </div>
                            <div className="form-group">
                                <label for="opslag">Opslag</label>
                                <input value={this.state.specifications[5].value} type="text" className="form-control" name="opslag" id="opslag" placeholder="Opslag" />
                            </div>
                            <div className="form-group">
                                <label for="kleur">Kleur</label>
                                <input value={this.state.specifications[6].value} type="text" className="form-control" name="kleur" id="kleur" placeholder="Kleur" />
                            </div>
                            <div className="form-group">
                                <label for="resolutie">Resolutie</label>
                                <input value={this.state.specifications[7].value} type="text" className="form-control" name="resolutie" id="resolutie" placeholder="Resolutie" />
                            </div>
                            <div className="form-group">
                                <label for="schermGrootte">Scherm Grootte</label>
                                <input value={this.state.specifications[8].value} type="text" className="form-control" name="schermGrootte" id="schermGrootte" placeholder="Scherm Grootte" />
                            </div>
                            <div className="form-group">
                                <label for="gewicht">Gewicht</label>
                                <input value={this.state.specifications[9].value} type="text" className="form-control" name="gewicht" id="gewicht" placeholder="Gewicht" />
                            </div>
                            <div className="form-group">
                                <label for="processor">Processor</label>
                                <input value={this.state.specifications[10].value} type="text" className="form-control" name="processor" id="processor" placeholder="Processor" />
                            </div>
                            <div className="form-group">
                                <label for="accu">Accu</label>
                                <input value={this.state.specifications[11].value} type="text" className="form-control" name="accu" id="accu" placeholder="Accu" />
                            </div>

                            <fieldset className="form-group">
                                <div className="row">
                                    <legend className="col-form-label col-sm-2 pt-0">Sim Lock Vrij</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check">
                                            <input checked={this.state.specifications[12].value == '1'} className="form-check-input" type="radio" name="simlockVrij" id="simlockVrij1" value="1" />
                                            <label className="form-check-label" for="simlockVrij1">
                                                Ja
                                </label>
                                        </div>
                                        <div className="form-check">
                                            <input checked={this.state.specifications[12].value == '0'} className="form-check-input" type="radio" name="simlockVrij" id="simlockVrij2" value="0" />
                                            <label className="form-check-label" for="simlockVrij2">
                                                Nee
                                </label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset className="form-group">
                                <div className="row">
                                    <legend className="col-form-label col-sm-2 pt-0">Micro SD</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check">
                                            <input checked={this.state.specifications[13].value == '1'} className="form-check-input" type="radio" name="microSD" id="microSD1" value="1" />
                                            <label className="form-check-label" for="microSD1">
                                                Uitbreidbaar met Micro SD
                                </label>
                                        </div>
                                        <div className="form-check">
                                            <input checked={this.state.specifications[13].value == '0'} className="form-check-input" type="radio" name="microSD" id="microSD2" value="0" />
                                            <label className="form-check-label" for="microSD2">
                                                Niet uitbreidbaar met Micro SD
                                </label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset className="form-group">
                                <div className="row">
                                    <legend className="col-form-label col-sm-2 pt-0">Mobiel Netwerk Ondersteuning</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check">
                                            <input checked={this.state.specifications[14].value == '5G'} className="form-check-input" type="radio" name="internetType" id="internetType1" value="5G" />
                                            <label className="form-check-label" for="internetType1">
                                                5G
                                </label>
                                        </div>
                                        <div className="form-check">
                                            <input checked={this.state.specifications[14].value == '4G'} className="form-check-input" type="radio" name="internetType" id="internetType2" value="4G" />
                                            <label className="form-check-label" for="internetType2">
                                                4G
                                </label>
                                        </div>
                                        <div className="form-check">
                                            <input checked={this.state.specifications[14].value == '3G'} className="form-check-input" type="radio" name="internetType" id="internetType3" value="3G" />
                                            <label className="form-check-label" for="internetType3">
                                                3G
                                </label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset className="form-group">
                                <div className="row">
                                    <legend className="col-form-label col-sm-2 pt-0">Dual Sim</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check">
                                            <input checked={this.state.specifications[15].value == '1'} className="form-check-input" type="radio" name="dualSim" id="dualSim1" value="1" />
                                            <label className="form-check-label" for="dualSim1">
                                                Dual Sim mogelijk
                                </label>
                                        </div>
                                        <div className="form-check">
                                            <input checked={this.state.specifications[15].value == '0'} className="form-check-input" type="radio" name="dualSim" id="dualSim2" value="0" />
                                            <label className="form-check-label" for="dualSim2">
                                                Dual Sim niet mogelijk
                                </label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                            <button type="submit" className="btn btn-primary" style={{ margin: `5px`}}>Save</button>
                            <Link to="/admin/product" className="btn btn-danger" style={{ margin: `5px` }}>Cancel</Link>
                        </form>
                    }
                </div>
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

// Map actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        getProductById: id => { dispatch(productActions.getById(id)); },
        updateProduct: (product, specifications) => { dispatch(productActions.update(product, specifications)); },
    }
};

const connectedEditProduct = connect(mapStateToProps, mapDispatchToProps)(EditProduct);
export { connectedEditProduct as EditProduct };