//node imports
import React from 'react';
import { connect } from 'react-redux';


import { addressActions } from '../../_actions';

class ChangeAddress extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(addressActions.getByUser());
    }
    componentDidUpdate() {
        if (this.props.address && !this.state.address) {
            this.setState({ address: this.props.address });
        }
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { address } = this.state;
        this.setState({
            submitted: false,
            address: {
                ...address,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { address } = this.state;
        const { dispatch } = this.props;
        if (address.country && address.county && address.city && address.street && address.streetNumber && address.zipcode) {
            dispatch(addressActions.update(address));
        }
    }

    render() {
        const { submitted } = this.state;
        const { address } = this.state
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Edit</h2>
                {address &&
                    <form id="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !address.country ? ' has-error' : '')}>
                            <label htmlFor="country">Country</label>
                            <input type="text" className="form-control" name="country" value={address.country} onChange={this.handleChange} />
                            {submitted && !address.country &&
                                <div className="help-block">Country is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !address.county ? ' has-error' : '')}>
                            <label htmlFor="county">County</label>
                            <input type="text" className="form-control" name="county" value={address.county} onChange={this.handleChange} />
                            {submitted && !address.county &&
                                <div className="help-block">County is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !address.city? ' has-error' : '')}>
                            <label htmlFor="city">City</label>
                            <input type="text" className="form-control" name="city" value={address.city} onChange={this.handleChange} />
                            {submitted && !address.city &&
                                <div className="help-block">City is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !address.street ? ' has-error' : '')}>
                            <label htmlFor="street">Street</label>
                            <input type="text" className="form-control" name="street" value={address.street} onChange={this.handleChange} />
                            {submitted && !address.street &&
                                <div className="help-block">Street is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !address.streetNumber ? ' has-error' : '')}>
                            <label htmlFor="streetNumber">StreetNumber</label>
                            <input type="text" className="form-control" name="streetNumber" value={address.streetNumber} onChange={this.handleChange} />
                            {submitted && !address.streetNumber &&
                                <div className="help-block">Streetnumber is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !address.streetSupplement ? ' has-error' : '')}>
                            <label htmlFor="streetSupplement">Streetsupplement</label>
                            <input type="text" className="form-control" name="streetSupplement" value={address.streetSupplement} onChange={this.handleChange} />
                        </div>
                        <div className={'form-group' + (submitted && !address.zipcode ? ' has-error' : '')}>
                            <label htmlFor="zipcode">Zipcode</label>
                            <input type="text" className="form-control" name="zipcode" value={address.zipcode} onChange={this.handleChange} />
                            {submitted && !address.zipcode &&
                                <div className="help-block">Zipcode is required</div>
                            }
                    </div>
                        
                    </form>
                }
                <button type="submit" form="form" className="btn btn-primary">Save</button>
                <a href="home" className="btn btn-danger">Cancel</a>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { items } = state.address;
    return {
        address: items,
    };
}

const connectedChangeAddress = connect(mapStateToProps)(ChangeAddress);
export { connectedChangeAddress as ChangeAddress };