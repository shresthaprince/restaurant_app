import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import './MainNavigation.css';

const mainNavigation = props => (
    <AuthContext.Consumer>
        {(context) => {
            return (
                <header className="main-navigation">
<<<<<<< HEAD
                    <div className="main-navigation_logo"><h1>Prince is gay</h1></div>
                    
=======
                    <NavLink to="/home">
                    <div className="main-navigation_logo"><h1>Not an Italian Restro</h1></div>
                    </NavLink>
>>>>>>> 57286abbf3e60f5341eef1f609fed873b43d0f36
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