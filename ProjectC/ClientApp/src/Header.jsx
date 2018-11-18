import React from 'react';
import { Link } from 'react-router-dom';
import './styling/header.css';
import { connect } from 'react-redux';

import logo from './styling/cmobile.jpg';

function UserLoggedIn(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <Buttons />;
}

function Buttons(props) {
    return (
        <div class="btn-group">
            <a href="/login" class="btn btn-info">Login</a>
            <a href="/register" class="btn btn-info">Register</a>
        </div>
    );
}

function UserGreeting(props) {
    return (
        <div>
            <div class="btn-group" role="group" aria-label="Basic example">
                <Link to={`profile`} class="btn btn-info">
                    User <i class="fas fa-user"></i>
                </Link>
                <button type="button" class="btn btn-danger">Logout <i class="fas fa-sign-out-alt"></i></button>
            </div>
        </div>
    );
}

class Header extends React.Component {
    render() {
        const { user } = this.props;
        return (
            <div>
                <nav class="navbar navbar-light bg-light fixed-top">
                    <div class="container">
                        <img src={logo} width="auto" height="60" alt=""/>
                        <form class="form-inline">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Search..."/>
                                <div class="input-group-append">
                                    <button class="btn btn-outline-info" type="button">Search</button>
                                </div>
                            </div>
                        </form>
                        <UserLoggedIn isLoggedIn={user} />
                        <Link to={`/checkout`} class="btn btn-info">
                            Shopping Cart <i class="fas fa-shopping-cart"></i>
                        </Link>
                    </div>
                </nav>
                <nav class="navbar">
                    <img src={logo} width="auto" height="60" alt=""/>
                </nav>

                <nav class="navbar" style={{ backgroundColor: "#223843", color: "white" }}>
                    <div class="container">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <Link to={`/home`} class="nav-link">Home</Link>
                            </li>
                            <li class="nav-item active">
                                <Link to={`/products`} class="nav-link">Phones</Link>
                            </li>
                            <li class="nav-item active">
                                <Link to={`/products`} class="nav-link">Accessories</Link>
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