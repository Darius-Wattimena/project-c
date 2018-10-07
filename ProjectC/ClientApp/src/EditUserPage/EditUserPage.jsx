//node imports
import React from 'react';
import { connect } from 'react-redux';


import { userActions } from '../_actions';

class EditUserPage extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(userActions.getEditUser(this.props.match.params.id));
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
            dispatch(userActions.update(user));
        }
    }

    render() {
        console.log(this.props);
        const { editUser } = this.props;
        const { submitted } = false;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Edit</h2>
                {editUser.item &&
                    <form id="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !editUser.firstname ? ' has-error' : '')}>
                            <label htmlFor="firstname">First Name</label>
                        <input type="text" className="form-control" name="firstname" value={editUser.firstname} onChange={this.handleChange} />
                        {submitted && !editUser.firstname &&
                                <div className="help-block">First Name is required</div>
                            }
                        </div>
                    <div className={'form-group' + (submitted && !editUser.lastname ? ' has-error' : '')}>
                            <label htmlFor="lastname">Last Name</label>
                        <input type="text" className="form-control" name="lastname" value={editUser.lastname} onChange={this.handleChange} />
                        {submitted && !editUser.lastname &&
                                <div className="help-block">Last Name is required</div>
                            }
                        </div>
                    <div className={'form-group' + (submitted && !editUser.mailaddress ? ' has-error' : '')}>
                            <label htmlFor="mailaddress">Email</label>
                        <input type="email" className="form-control" name="mailaddress" value={editUser.mailaddress} onChange={this.handleChange} />
                        {submitted && !editUser.mailaddress &&
                                <div className="help-block">Email is required</div>
                            }
                        </div>
                    <div className={'form-group' + (submitted && !editUser.password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={editUser.password} onChange={this.handleChange} />
                        {submitted && !editUser.password &&
                                <div className="help-block">Password is required</div>
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
    const { users } = state;
    return {
        users
    };
}

const connectedRegisterPage = connect(mapStateToProps)(EditUserPage);
export { connectedRegisterPage as EditUserPage };