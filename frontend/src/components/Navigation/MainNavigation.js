import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import './MainNavigation.css';

const mainNavigation = props => (
    <AuthContext.Consumer>
        {(context) => {
            return (
                <header className="main-navigation">
                    <div className="main-navigation_logo"><h1>Prince is gay</h1></div>
                    
                    <div className="main-navigation_item">
                        <ul>
                            {!context.token && <li>
                                <NavLink to="/auth">Authenticate</NavLink>
                            </li>}
                            <li>
                                <NavLink to="/tables">Book a Table</NavLink>
                            </li>
                            {context.token && (
                                <React.Fragment>
                                    <li>
                                        <NavLink to="/bookings">Bookings</NavLink>
                                    </li>
                                    <li>
                                        <button onClick={context.logout}>Logout</button>
                                    </li>
                                </React.Fragment>
                            )}

                        </ul>
                    </div>
                </header>
            )
        }
        }

    </AuthContext.Consumer>
);

export default mainNavigation;