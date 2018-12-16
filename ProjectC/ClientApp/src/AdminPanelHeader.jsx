import React from 'react';
import { Link } from 'react-router-dom';

export class AdminPanelHeader extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar bg-dark navbar-dark">
                    <span className="navbar-brand mb-0 h1">Adminpanel</span>


                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to={`/home`} className="btn btn-info">Home</Link>
                        </li>
                    </ul>
                </nav>
             </div>
            );
    }
}