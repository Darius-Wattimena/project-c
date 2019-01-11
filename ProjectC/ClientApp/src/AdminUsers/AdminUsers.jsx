import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

function ActivateTogggleButton(props) {
    if (props.user.deactivating) {
        return (<td>Loading...</td>);
    }

    if (props.user.active) {
        return (<td><button className="btn btn-danger" disabled={props.disabled} onClick={(e) => window.component.deactivateUser(e, props.user.id)}>Deactivate</button></td>);
    } else {
        return (<td><button className="btn btn-success" disabled={props.disabled} onClick={(e) => window.component.deactivateUser(e, props.user.id)}>Activate</button></td>);
    }
}

function EditButton(props) {
    if (props.disabled) {
        return (<td><Link className="btn btn-info disabled" to={`users/edit/${props.user.id}`}>Edit</Link></td>);
    } else {
        return (<td><Link className="btn btn-info" to={`users/edit/${props.user.id}`}>Edit</Link></td>);
    }
}

class AdminUsers extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());

        window.component = this;
    }

    handleDeactivateUser(id) {
        return (e) => this.props.dispatch(userActions.deactivate(id));
    }

    deactivateUser(e, id) {
        e.preventDefault();
        this.props.dispatch(userActions.deactivate(id));
    }

    render() {
        const { users } = this.props;
        return (
            <div className="admin-panel panel col-10">
                <h3>User Management</h3>
                <hr />
                {users.loading &&
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                }
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <table className="table table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Email</th>
                            <th scope="col">Firstname</th>
                            <th scope="col">Lastname</th>
                            <th scope="col">Edit Action</th>
                            <th scope="col">Deactivate Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.items.map((user, index) =>
                                <tr>
                                    <td scope="row">{user.id}</td>
                                    <td>{user.mailAddress}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <EditButton user={user} disabled={users.deactivating} />
                                    <ActivateTogggleButton user={user} disabled={users.deactivating} />
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
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

const connectedAdminUsers = connect(mapStateToProps)(AdminUsers);
export { connectedAdminUsers as AdminUsers };
