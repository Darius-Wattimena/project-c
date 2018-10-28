import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../styling/form.css';

import { specificationActions } from '../../_actions';

class AddSpecifications extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            specifications: [
                { id: 0, name: "merk", value: "", productId: this.props.match.params.id },
                { id: 0, name: "os", value: "", productId: this.props.match.params.id },
                { id: 0, name: "geheugen", value: "", productId: this.props.match.params.id },
                { id: 0, name: "grootte", value: "", productId: this.props.match.params.id },
                { id: 0, name: "camera", value: "", productId: this.props.match.params.id },
                { id: 0, name: "opslag", value: "", productId: this.props.match.params.id },
                { id: 0, name: "kleur", value: "", productId: this.props.match.params.id },
                { id: 0, name: "resolutie", value: "", productId: this.props.match.params.id },
                { id: 0, name: "schermGrootte", value: "", productId: this.props.match.params.id },
                { id: 0, name: "gewicht", value: "", productId: this.props.match.params.id },
                { id: 0, name: "processor", value: "", productId: this.props.match.params.id },
                { id: 0, name: "accu", value: "", productId: this.props.match.params.id },
                { id: 0, name: "simlockVrij", value: "", productId: this.props.match.params.id },
                { id: 0, name: "microSD", value: "", productId: this.props.match.params.id },
                { id: 0, name: "internetType", value: "", productId: this.props.match.params.id },
                { id: 0, name: "dualSim", value: "", productId: this.props.match.params.id }
            ],
            ProductId: this.props.match.params.id,
            submitted: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const { specifications, ProductId } = this.state;
        const { dispatch } = this.props;

        // Add the product
        dispatch(specificationActions.add(specifications, ProductId));
    }

    handleChange(event) {
       
        const { name, value } = event.target;
        const { specifications } = this.state;

        for (var i in specifications) {
            if (specifications[i].name === name) {
                specifications[i].value = value;
                break;
            }
        }

        // Update the value of the property that was changed
        this.setState({
            specifications
        });
    }

    render() {
        // Render the view
        return (
            <div class="panel col-md-8">
            <div className='adminPanel' class="container">
                <form id="product" onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <h3>Add Specifications</h3>
                    <div class="form-group">
                        <label for="merk">Merk</label>
                        <input type="text" class="form-control" name="merk" id="merk" placeholder="Merk" />
                    </div>
                    <div class="form-group">
                        <label for="os">Operating System</label>
                        <input type="text" class="form-control" name="os" id="os" placeholder="OS" />
                    </div>
                    <div class="form-group">
                        <label for="geheugen">Geheugen</label>
                        <input type="text" class="form-control" name="geheugen" id="geheugen" placeholder="Geheugen" />
                    </div>
                    <div class="form-group">
                        <label for="grootte">Telefoon Groote</label>
                        <input type="text" class="form-control" name="grootte" id="grootte" placeholder="Groote" />
                    </div>
                    <div class="form-group">
                        <label for="camera">Camera</label>
                        <input type="text" class="form-control" name="camera" id="camera" placeholder="Camera" />
                        </div>
                    <div class="form-group">
                        <label for="opslag">Opslag</label>
                        <input type="text" class="form-control" name="opslag" id="opslag" placeholder="Opslag" />
                    </div>
                    <div class="form-group">
                        <label for="kleur">Kleur</label>
                        <input type="text" class="form-control" name="kleur" id="kleur" placeholder="Kleur" />
                    </div>
                    <div class="form-group">
                        <label for="resolutie">Resolutie</label>
                        <input type="text" class="form-control" name="resolutie" id="resolutie" placeholder="Resolutie" />
                    </div>
                    <div class="form-group">
                        <label for="schermGrootte">Scherm Grootte</label>
                        <input type="text" class="form-control" name="schermGrootte" id="schermGrootte" placeholder="Scherm Grootte" />
                    </div>
                    <div class="form-group">
                        <label for="gewicht">Gewicht</label>
                        <input type="text" class="form-control" name="gewicht" id="gewicht" placeholder="Gewicht" />
                    </div>
                    <div class="form-group">
                        <label for="processor">Processor</label>
                        <input type="text" class="form-control" name="processor" id="processor" placeholder="Processor" />
                    </div>
                    <div class="form-group">
                        <label for="accu">Accu</label>
                        <input type="text" class="form-control" name="accu" id="accu" placeholder="Accu" />
                        </div>

                    <fieldset class="form-group">
                        <div class="row">
                            <legend class="col-form-label col-sm-2 pt-0">Sim Lock Vrij</legend>
                            <div class="col-sm-10">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="simlockVrij" id="simlockVrij1" value="1" />
                                    <label class="form-check-label" for="simlockVrij1">
                                        Ja
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="simlockVrij" id="simlockVrij2" value="0" />
                                    <label class="form-check-label" for="simlockVrij2">
                                        Nee
                                    </label>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset class="form-group">
                        <div class="row">
                            <legend class="col-form-label col-sm-2 pt-0">Micro SD</legend>
                            <div class="col-sm-10">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="microSD" id="microSD1" value="1" />
                                    <label class="form-check-label" for="microSD1">
                                        Uitbreidbaar met Micro SD
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="microSD" id="microSD2" value="0" />
                                    <label class="form-check-label" for="microSD2">
                                        Niet uitbreidbaar met Micro SD
                                    </label>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset class="form-group">
                        <div class="row">
                            <legend class="col-form-label col-sm-2 pt-0">Mobiel Netwerk Ondersteuning</legend>
                            <div class="col-sm-10">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="internetType" id="internetType1" value="5G" />
                                    <label class="form-check-label" for="internetType1">
                                        5G
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="internetType" id="internetType2" value="4G" />
                                    <label class="form-check-label" for="internetType2">
                                        4G
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="internetType" id="internetType3" value="3G" />
                                    <label class="form-check-label" for="internetType3">
                                        3G
                                    </label>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset class="form-group">
                        <div class="row">
                            <legend class="col-form-label col-sm-2 pt-0">Dual Sim</legend>
                            <div class="col-sm-10">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="dualSim" id="dualSim1" value="1" />
                                    <label class="form-check-label" for="dualSim1">
                                        Dual Sim mogelijk
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="dualSim" id="dualSim2" value="0" />
                                    <label class="form-check-label" for="dualSim2">
                                        Dual Sim niet mogelijk
                                    </label>
                                </div>
                            </div>
                        </div>
                    </fieldset>

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

const connectedAddSpecifications = connect(mapStateToProps)(AddSpecifications);
export { connectedAddSpecifications as AddSpecifications };