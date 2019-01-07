import React from 'react';
import { Link } from 'react-router-dom';
import './styling/header.css';
import { connect } from 'react-redux';
import { userActions, productActions } from './_actions';

import logo from './styling/cmobile.jpg';

function UserLoggedIn(props) {
    const isLoggedIn = props.user;
    if (isLoggedIn) {
        return <UserButtons base={props.base} user={props.user} />;
    }
    return <StartButtons />;
}

function StartButtons(props) {
    return (
        <div className="btn-group">
            <a href="/login" className="btn btn-info">Login</a>
            <a href="/register" className="btn btn-info">Register</a>
        </div>
    );
}

function AdminButtons(props) {
    if (props.role === "Admin") {
        return <Link to={`admin/statistics`} className="btn btn-warning">Admin <i className="fas fa-user-shield"></i></Link>;
    } else {
        return "";
    }
}

function UserButtons(props) {
    return (
        <div>
            <div className="btn-group" role="group" aria-label="Basic example">
                <Link to={`profile`} className="btn btn-info">
                    {props.user.firstName} <i className="fas fa-user"></i>
                </Link>
                <AdminButtons role={props.user.role} />
                <button type="button" className="btn btn-danger" onClick={props.base.logout}> Logout <i className="fas fa-sign-out-alt"></i></button>
            </div>
        </div>
    );
}

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchValue: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logout = this.logout.bind(this);
    }

    handleChange(event) {
        this.setState({
            searchValue: event.target.value
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { searchValue } = this.state;
        const { dispatch } = this.props;
        if (searchValue) {
            dispatch(productActions.search(searchValue));
        }
    }

    logout() {
        this.props.dispatch(userActions.logout());
    }

    render() {
        const { user, searchValue } = this.props;
        return (
            <div>
                <nav className="navbar navbar-light bg-light fixed-top">
                    <div className="container">
                        <Link to="/">
                            <img src={logo} width="auto" height="60" alt="" />
                        </Link>
                        <form className="form-inline" onSubmit={this.handleSubmit}>
                            <div className="input-group">
                                <input type="text" className="form-control" value={searchValue} onChange={this.handleChange} placeholder="Search..." />
                                <div className="input-group-append">
                                    <button onClick={this.handleSubmit} className="btn btn-outline-info" type="button">Search</button>
                                </div>
                            </div>
                        </form>
                        <UserLoggedIn base={this} user={user} />
                        <div className="btn-group">
                            <Link to={`/checkout`} className="btn btn-info">
                                Shopping Cart <i className="fas fa-shopping-cart"></i>
                            </Link>
                            <Link to={`/wishlist`} className="btn btn-info">
                                Wishlist <i className="fas fa-heart" style={{ color: 'red' }}></i>
                            </Link>
                        </div>
                    </div>
                </nav>
                <nav className="navbar">
                    <img src={logo} width="auto" height="60" alt="" />
                </nav>

                <nav className="navbar" style={{ backgroundColor: "#223843", color: "white" }}>
                    <div className="container">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link to={`/home`} className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item active">
                                <Link to={`/products`} className="nav-link">Products</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedHeader = connect(mapStateToProps)(Header);
export { connectedHeader as Header };