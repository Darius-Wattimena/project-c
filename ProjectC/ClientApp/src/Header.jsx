import React from 'react';
import { Link } from 'react-router-dom';
import './styling/header.css';
import { connect } from 'react-redux';
import { userActions, productActions } from './_actions';

import logo from './styling/cmobile.jpg';

function UserLoggedIn(props) {
    const isLoggedIn = props.user;
    if (isLoggedIn) {
        return <UserButtons user={props.user} />;
    }
    return <StartButtons />;
}

function StartButtons(props) {
    return (
        <div class="btn-group">
            <a href="/login" class="btn btn-info">Login</a>
            <a href="/register" class="btn btn-info">Register</a>
        </div>
    );
}

function AdminButtons(props) {
    if (props.role === "Admin") {
        return <Link to={`admin`} class="btn btn-warning">Admin <i class="fas fa-user-shield"></i></Link>;
    } else {
        return "";
    }
}

function UserButtons(props) {
    return (
        <div>
            <div class="btn-group" role="group" aria-label="Basic example">
                <Link to={`profile`} class="btn btn-info">
                    User <i class="fas fa-user"></i>
                </Link>
                <AdminButtons role={props.user.role}/>
                <button type="button" class="btn btn-danger" onClick={window.headercomponent.logout}> Logout <i class="fas fa-sign-out-alt"></i></button>
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

        // Make component accessible
        window.headercomponent = this;

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
                <nav class="navbar navbar-light bg-light fixed-top">
                    <div class="container">
                        <img src={logo} width="auto" height="60" alt=""/>
                        <form class="form-inline" onSubmit={this.handleSubmit}>
                            <div class="input-group">
                                <input type="text" class="form-control" value={searchValue} onChange={this.handleChange} placeholder="Search..."/>
                                <div class="input-group-append">
                                    <button onClick={this.handleSubmit} class="btn btn-outline-info" type="button">Search</button>
                                </div>
                            </div>
                        </form>
                        <UserLoggedIn user={user} />
                        <Link to={`/checkout`} class="btn btn-info">
                            Shopping Cart <i class="fas fa-shopping-cart"></i>
                        </Link>
                        <Link to={`/wishlist`} class="btn btn-info">
                            Wishlist <i class="fas fa-heart" style={{color: 'red'}}></i>
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
                                <Link to={`/products`} class="nav-link">Products</Link>
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