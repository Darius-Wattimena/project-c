﻿//node imports
import React from 'react';
import { connect } from 'react-redux';


import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstname: "",
                lastname: "",
                password: "",
                mailaddress: ""
            },
            submitted: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstname && user.lastname && user.password && user.mailaddress) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form id="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.firstname ? ' has-error' : '')}>
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" className="form-control" name="firstname" value={user.firstname} onChange={this.handleChange} />
                        {submitted && !user.firstname &&
                            <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.lastname ? ' has-error' : '')}>
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" className="form-control" name="lastname" value={user.lastname} onChange={this.handleChange} />
                        {submitted && !user.lastname &&
                            <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.mailaddress ? ' has-error' : '')}>
                        <label htmlFor="mailaddress">Email</label>
                        <input type="email" className="form-control" name="mailaddress" value={user.mailaddress} onChange={this.handleChange} />
                        {submitted && !user.mailaddress &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                </form>

                <button type="submit" form="form" className="btn btn-primary">Register</button>
                {registering &&
                    <div>Creating a new account</div>
                }
                <a href="home" className="btn btn-danger">Back</a>
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