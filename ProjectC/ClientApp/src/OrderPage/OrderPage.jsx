//node imports
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../styling/OrderStyling.css';
import { history } from '../_helpers';

class OrderPage extends React.Component {
    render() {
        const { user } = this.props;
        if (user == null) {
            history.push("/login");
            return (null);
        } else {
            return (
                <div>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-7">
                                <div className="section">

                                </div>
                            </div>

                            <div class="col-sm-5">
                                <div className="section">
                                    <div className="row"><i class="fas fa-user-circle user"></i><h5>{user.firstname} {user.lastname}</h5></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            );
        }
    }




}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedOrderPage = connect(mapStateToProps)(OrderPage);
export { connectedOrderPage as OrderPage };