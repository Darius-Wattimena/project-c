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
                            <p>{user.firstname}</p>
                            <p>{user.lastname}</p>
                        <p>{user.mailAddress}</p>
                        <Link to="changename">Change Name</Link>
                        </div>
                    }
                </div>

                <div className="col-md-5">
                    <h5>Address</h5>
                    {address.items &&
                        <div>
                            <p>{address.items.country}</p>
                            <p>{address.items.county}</p>
                            <p>{address.items.city}</p>
                            <p>{address.items.street}</p>
                            <p>{address.items.streetNumber}{address.streetSupplement}</p>
                            <p>{address.items.zipcode}</p>
                            <Link to="changeaddress">Change Address</Link>
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

