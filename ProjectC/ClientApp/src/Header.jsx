import React from 'react';
import { NavLink } from 'react-router-dom';
import './styling/header.css';

import logo from './styling/cmobile.jpg';

export function Header() {
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
                        <div class="btn-group">
                            <button class="btn btn-info">Login</button>
                            <a href="/register" class="btn btn-outline-info">Register</a>
                        </div>
                    </div>
                </nav>
                <nav class="navbar">
                    <img src={logo} width="auto" height="60" alt="" />
                </nav>

                <nav class="navbar" style={{ backgroundColor: "#223843", color: "white" }}>
                    <div class="container">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <a href="/home" class="nav-link">Home</a>
                            </li>
                            <li class="nav-item active">
                                <a href="/products" class="nav-link">Phones</a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link">Accessories</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }