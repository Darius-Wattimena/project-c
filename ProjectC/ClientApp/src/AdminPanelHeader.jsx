import React from 'react';
import { Link } from 'react-router-dom';

export class AdminPanelHeader extends React.Component {
    render() {
        return (
            <div>
                <nav class="navbar bg-dark navbar-dark">
                    <span class="navbar-brand mb-0 h1">Adminpanel</span>


                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <Link to={`/home`} class="btn btn-info">Home</Link>
                        </li>
                    </ul>
                </nav>
             </div>
            );
    }
}