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
        <p>Welcome!</p>
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
                        <Link to="/order">order</Link>
                        <a href="checkout">
                    <span>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAMAAAAPdrEwAAAAZlBMVEX///8AAACJiYk9PT2Pj4/s7OygoKDY2NhMTEykpKR6enrn5+fz8/PPz8+pqanMzMzExMSvr69fX19aWlpoaGje3t5UVFSYmJi+vr4wMDC2trb5+flDQ0MWFhY4ODhxcXEMDAwiIiLublIIAAACGklEQVRYhe2Y25aCIBSG3Yii5jEDq9Gc3v8lJ4VNa0bNwLyZxXcjsuN3HzhonudwOBwOh+MfUmQjRfpxZQ6K08elkar72kv6AHwvaQ+a3aST227SBeyW7BTOe0l7QlCi0I0FqGGAIfiKFlpsdTfsvD07L3Awk+YQ6AB0J9WL9PCcQUfj5QUhtnodMNH+nUv9EChMpRMfW1QLPqWJXlIUTJW9Ug+J2VQ60akBaiydAsbMcuyjOv/HpweGRRxo64aOJIIqIqIazV3ZGr82V/aaLpDwUyobacJUV0ZUF9OxmcB0qHp26VyXV9WIzYs4ALFqRBPpECtrUcSBHiUJVo/8jaOw3NfPGGyF+dTPwNodhWfFASrOHvCKjlfG+5JJTrIjg+u6zCxtW8Ujfj5e8rqR902dy3u7Ij6geNTgAsGEZJW8dsRWWk8/rBqWMczkE2xWogKUdyT9La0WfL/hAD0pdyn/LS232cC6iA9yVaZSbcl4FMjcV9ZFHP16iXURB25tHC7SBOsCy9B2y+iXFLDJs5dsmQQr1Pu9aOdbJthrOLD1H1lysTtG3uHY1UJEMwgh6nx9/DL3cdn1yZTRcLFXlgJzZ2soLYmt8tcdHm9+Edynb9CXweMIvm0/MIPRYQrdRCD9Hhyes7yLD1CWAP7UIgDO5ZZkX2VGZ75rSmnZsA/Ew/hqzlINlk1fl2mx9FfAssXhcDgcDse/4Qc4xRdAyaOZqAAAAABJRU5ErkJggg=="
                                    style={{ width: '50px', height: '50px' }}
                                />
                            </span>
                        </a>
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