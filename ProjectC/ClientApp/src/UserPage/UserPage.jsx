import React from 'react';
import { connect } from 'react-redux';
import { history } from '../_helpers';

import { addressActions } from '../_actions';

import '../styling/UserPageStyling.css';
import { OrderHistory } from './OrderHistory';
import { UserProfile } from './UserProfile';

var page = "Profile";


function Page(props) {
    const page = props.page

    if (page === "Profile") {
        return <UserProfile />;
    }
    else if (page === "Order History") {
        return <OrderHistory />;
    }
    else {
        return null;
    }
}

class UserPage extends React.Component {

    componentDidMount() {
        page = "Profile"
        this.setState({ p: "Profile" });
    }

    onClick(p) {
        page = p;
        this.setState({ p: page });
    }

    render() {
        const { user } = this.props;
        if (user == null) {
            history.push("/login");
            return (null);
        } else {
            return (

                <div className="row">
                    <div className="filters-container col-sm-3">
                        <nav className="navbar navbar-dark bg-info">
                            <a className="nav-link">Mijn C-Mobile</a>
                        </nav>
                        <a className="Link" onClick={this.onClick.bind(this,"Profile")}>Profile</a><br />
                        <a className="Link" onClick={this.onClick.bind(this,"Order History")}>Order History</a><br/>
                    </div>
                    <div className="products-container col-sm-9">
                        <nav className="navbar navbar-dark bg-info">
                            <ul className="navbar-nav">
                                <li className="nav-right active">
                                    <a className="nav-link">{page}</a>
                                </li>
                            </ul>
                        </nav>
                        {this.state && <Page page={this.state.p} />}
                    </div>
                </div>

            );
        }
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    const { address } = state;
    return {
        user,
        address
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // accessible via this.props.getAllProducts
        
    }
};

const connectedUserPage = connect(mapStateToProps, mapDispatchToProps)(UserPage);
export { connectedUserPage as UserPage };