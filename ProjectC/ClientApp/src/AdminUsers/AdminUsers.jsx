import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class AdminUsers extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { users } = this.props;
        return (
            <div className="panel col-md-6">
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <table className="table table-hover">
                        <thead className="thead-dark">
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
                                    <td>{user.mailAddress}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{
                                        user.deleting ? <em> - Deleting...</em>
                                            : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                            : <span> <Link to={`users/edit/${user.id}`}>Edit</Link> - <button className="btn btn-link" onClick={this.handleDeleteUser.bind(this,user.id)}>Delete</button></span>
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
