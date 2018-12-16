import React from 'react';
import { Link } from 'react-router-dom';
import { addressActions } from '../../_actions';
import { connect } from 'react-redux';

class UserProfile extends React.Component {
    componentDidMount() {
        this.props.AddressByUser()
    }

    render() {
        const { address } = this.props;
        const { user } = this.props.authentication;
        return (
            <div class="row ohf">
                <div className="col-md-5">
                    <h5>User</h5>
                    {user &&
                        <div>
                            <p>{user.firstName}</p>
                            <p>{user.lastName}</p>
                            <p>{user.mailAddress}</p>
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
    const { authentication } = state;
    const { address } = state;
    return {
        authentication,
        address
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // accessible via this.props.getAllProducts
        AddressByUser: () => dispatch(addressActions.getByUser()),
    }
};

const connectedUserProfile = connect(mapStateToProps, mapDispatchToProps)(UserProfile);
export { connectedUserProfile as UserProfile };

