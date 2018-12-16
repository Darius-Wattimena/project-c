//node imports
import React from 'react';
import { connect } from 'react-redux';
import '../styling/form.css';

import { userActions } from '../_actions';

import { history } from '../_helpers';

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function EmailError(props) {
    if (!props.submitted) {
        return "";
    }

    if (!props.mailaddress) {
        return <div className="help-block text-danger">Email is required</div>;
    }
    else if (!validateEmail(props.mailaddress)) {
        return <div className="help-block text-danger">Email is not valid</div>;
    }
    return "";
}

function PasswordError(props) {
    if (!props.submitted) {
        return "";
    }

    if (props.confirmForm && !props.confirmPassword) {
        return <div className="help-block text-danger">Confirm Password is required</div>;
    } else if (props.confirmForm && !props.password) {
        return <div className="help-block text-danger">Password is required</div>;
    }

    if (props.password !== props.confirmPassword) {
        return <div className="help-block text-danger">The passwords do not match</div>;
    }

    return "";
}

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstname: "",
                lastname: "",
                password: "",
                confirmPassword: "",
                mailaddress: "",
                roleId: 2,
                address: {
                    country: "",
                    county: "",
                    city: "",
                    street: "",
                    streetNumber: "",
                    streetSupplement: "",
                    zipCode: ""
                }
            },
            submitted: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        console.log(user);
        this.setState({
            submitted: false,
            user: {
                ...user,
                [name]: value
            },
        });
    }

    handleAddressChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        console.log(user);
        this.setState({
            submitted: false,
            user: {
                ...user,
                address: {
                    ...user.address,
                    [name]: value
                }
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { address } = this.state;
        const { dispatch } = this.props;
        if (user.firstname && user.lastname && user.password && user.confirmPassword && user.mailaddress && user.address.country && user.address.county && user.address.city && user.address.street && user.address.streetNumber && user.address.zipCode) {
            if (validateEmail(user.mailaddress) && (user.password === user.confirmPassword)) {
                dispatch(userActions.register(user));
                console.log(address);
            }
        }
    }

    render() {
        const { registering } = this.props;
        const { user, submitted, address } = this.state;
        return (
            <div className="col-md-offset-3">
              
                <form id="form" onSubmit={this.handleSubmit}>
                    <h2>Register</h2>
                    <div className={'form-group' + (submitted && !user.mailaddress ? ' has-error' : '')}>
                        <label htmlFor="mailaddress">Email</label>
                        <input type="email" className="form-control" name="mailaddress" value={user.mailaddress} onChange={this.handleChange} />
                        <EmailError mailaddress={user.mailaddress} submitted={submitted} />
                    </div>
                    <div className={'form-group' + (submitted && !user.confirmPassword ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />

                        <PasswordError password={user.password} confirmPassword={user.confirmPassword} submitted={submitted} confirmForm={false} />
                    </div>

                    <div className={'form-group' + (submitted && !user.confirmPassword ? ' has-error' : '')}>

                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" className="form-control" name="confirmPassword" value={user.confirmPassword} onChange={this.handleChange} />

                        <PasswordError password={user.password} confirmPassword={user.confirmPassword} submitted={submitted} confirmForm={true} />
                        
                    </div>

                    <div className={'form-group' + (submitted && !user.firstname ? ' has-error' : '')}>
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" className="form-control" name="firstname" value={user.firstname} onChange={this.handleChange} />
                        {submitted && !user.firstname &&
                            <div className="help-block text-danger">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.lastname ? ' has-error' : '')}>
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" className="form-control" name="lastname" value={user.lastname} onChange={this.handleChange} />
                        {submitted && !user.lastname &&
                            <div className="help-block text-danger">Last Name is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.address.country ? ' has-error' : '')}>
                        <label htmlFor="country">Country</label>
                        <input type="text" className="form-control" name="country" value={user.address.country} onChange={this.handleAddressChange} />
                        {submitted && !user.address.country &&
                            <div className="help-block text-danger">Country is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.address.county ? ' has-error' : '')}>
                        <label htmlFor="county">County</label>
                        <input type="text" className="form-control" name="county" value={user.address.county} onChange={this.handleAddressChange} />
                        {submitted && !user.address.county &&
                            <div className="help-block text-danger">County is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.address.city ? ' has-error' : '')}>
                        <label htmlFor="city">City</label>
                        <input type="text" className="form-control" name="city" value={user.address.city} onChange={this.handleAddressChange} />
                        {submitted && !user.address.city &&
                            <div className="help-block text-danger">City is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.address.street ? ' has-error' : '')}>
                        <label htmlFor="street">Street</label>
                        <input type="text" className="form-control" name="street" value={user.address.street} onChange={this.handleAddressChange} />
                        {submitted && !user.address.street &&
                            <div className="help-block text-danger">Street is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.address.streetNumber ? ' has-error' : '')}>
                        <label htmlFor="streetNumber">StreetNumber</label>
                        <input type="text" className="form-control" name="streetNumber" value={user.address.streetNumber} onChange={this.handleAddressChange} />
                        {submitted && !user.address.streetNumber &&
                            <div className="help-block text-danger">StreetNumber is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.address.streetSupplement ? ' has-error' : '')}>
                        <label htmlFor="streetSupplement">StreetSupplement</label>
                        <input type="text" className="form-control" name="streetSupplement" value={user.address.streetSupplement} onChange={this.handleAddressChange} />
                    </div>
                    <div className={'form-group' + (submitted && !user.address.zipCode ? ' has-error' : '')}>
                        <label htmlFor="zipCode">ZipCode</label>
                        <input type="text" className="form-control" name="zipCode" value={user.address.zipCode} onChange={this.handleAddressChange} />
                        {submitted && !user.address.zipCode &&
                            <div className="help-block text-danger">ZipCode is required</div>
                        }
                    </div>
                    <button type="submit" form="form" className="btn btn-primary">Register</button>
                    {registering &&
                        <div>Creating a new account</div>
                    }
                    <a href="home" className="btn btn-danger">Back</a>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };