import React from 'react';
import { Link } from 'react-router-dom';
import { addressActions, userActions } from '../../_actions';
import { connect } from 'react-redux';

class UserProfile extends React.Component {
    componentDidMount() {
        this.props.AddressByUser()
        this.props.getUserByToken();
    }

    render() {
        const { address } = this.props;
        const user = this.props.editUser;
        return (
            <div class="row ohf">
                <div className="col-md-5">
                    <h5>User</h5>
                    {user &&
                        <div>
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td>Firstname</td>
                                    <td>{user.firstname}</td>
                                </tr>
                                <tr>
                                    <td>lastname</td>
                                    <td>{user.lastname}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{user.mailAddress}</td>
                                </tr>
                            </tbody>
                            <Link to="changename"><button class="btn btn-info">Change Account</button></Link>
                        </table>
                        </div>
                    }
                </div>

                <div className="col-md-5">
                    <h5>Address</h5>
                    {address.items &&
                        <div>
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td>Country</td>
                                    <td>{address.items.country}</td>
                                </tr>
                                <tr>
                                    <td>County</td>
                                    <td>{address.items.county}</td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td>{address.items.city}</td>
                                </tr>
                                <tr>
                                    <td>Street</td>
                                    <td>{address.items.street}</td>
                                </tr>
                                <tr>
                                    <td>Number</td>
                                    <td>{address.items.streetNumber}{address.streetSupplement}</td>
                                </tr>
                                <tr>
                                    <td>Zipcode</td>
                                    <td>{address.items.zipcode}</td>
                                </tr>
                            </tbody>
                            <Link to="changeaddress"><button class="btn btn-info">Change Address</button></Link>
                        </table>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { items, loading } = state.editUser;
    const { address } = state;
    return {
        editUser: items,
        loading: loading,
        address
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // accessible via this.props.getAllProducts
        AddressByUser: () => dispatch(addressActions.getByUser()),
        getUserByToken: () => dispatch(userActions.getUserByToken())
    }
};

const connectedUserProfile = connect(mapStateToProps, mapDispatchToProps)(UserProfile);
export { connectedUserProfile as UserProfile };

