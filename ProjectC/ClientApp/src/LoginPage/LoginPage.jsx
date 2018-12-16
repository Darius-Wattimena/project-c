//node imports
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                password: "",
                mailaddress: ""
            },
            submitted : false
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
        this.setState({ submitted : true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.mailaddress && user.password) {
            dispatch(userActions.login(user));
        }
    }


    render() {
        const { user, submitted } = this.state;
        console.log(user);

        return (
            <div className="col-md-6 col-md-offset-3">
                <form id="form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="mailaddress" value={user.mailaddress} onChange={this.handleChange} />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" value={user.password} onChange={this.handleChange} />
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>

                        <Link to="/register" className="btn btn-link">Register</Link>
                    </form>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
