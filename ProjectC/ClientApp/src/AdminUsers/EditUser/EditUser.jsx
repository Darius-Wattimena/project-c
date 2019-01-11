//node imports
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';

class AdminEditUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { dispatch, match } = this.props;
        dispatch(userActions.getEditUser(match.params.id));
    }

    componentDidUpdate() {
        if (!this.props.loading && !this.state.user) {
            this.setState({ user: this.props.editUser });
        }
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
        if (user.firstname && user.lastname && user.password && user.mailAddress) {
            dispatch(userActions.update(user));
        }
    }

    render() {
        const { user, submitted } = this.state;
        return (
            <div className="admin-panel panel col-10">
                <h3>Edit User</h3>
                <hr />
                {user &&
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
                        <div className={'form-group' + (submitted && !user.mailAddress ? ' has-error' : '')}>
                            <label htmlFor="mailAddress">Email</label>
                            <input type="email" className="form-control" name="mailAddress" value={user.mailAddress} onChange={this.handleChange} />
                            {submitted && !user.mailAddress &&
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
                }
                <button type="submit" form="form" className="btn btn-primary" disabled={submitted}>Save</button>
                <Link to="/admin/users" className="btn btn-danger">Cancel</Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { items, loading } = state.editUser;
    return {
        editUser: items,
        loading: loading
    };
}

const connectedPage = connect(mapStateToProps)(AdminEditUser);
export { connectedPage as AdminEditUser };