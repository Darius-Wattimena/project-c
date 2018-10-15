﻿import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class AdminUsers extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { users } = this.props;
        console.log(this.props);
        return (
            <div className="panel col-md-6">
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <table class="table table-hover">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Email</th>
                                <th scope="col">Firstname</th>
                                <th scope="col">Lastname</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.items.map((user, index) =>
                                <tr>
                                    <td scope="row">{user.id}</td>
                                    <td>{user.mailaddress}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{
                                        user.deleting ? <em> - Deleting...</em>
                                            : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                                : <span> <Link to={`user/edit/${user.id}`}>Edit</Link> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                    }</td>
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