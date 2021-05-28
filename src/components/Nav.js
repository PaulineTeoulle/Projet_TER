import React, {useContext} from 'react';
import {Link} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFileUpload, faHome, faProjectDiagram, faQuestion, faUser, faUserCog, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import Auth from "../contexts/Auth";
import {logout} from "../services/AuthApi";

const Nav = () => {
    const {isAuthenticated, setIsAuthenticated} = useContext(Auth);
    const {userRole, setUserRole} = useContext(Auth);

    const handleLogout = () => {
        logout();
        setIsAuthenticated(false);
        setUserRole(null);
    };
    return ( 
        <div className="Navigation">
            <nav>
                <ul>
                    <Link to="/">
                        <li><FontAwesomeIcon className="icon" icon={faHome}/></li>
                    </Link>
                    <Link to="/quiz">
                        <li><FontAwesomeIcon className="icon" icon={faQuestion}/></li>
                    </Link>

                    {!isAuthenticated && (<>
                        <Link to="/login">
                            <li><FontAwesomeIcon className="icon" icon={faUser}/></li>
                        </Link>
                    </>)}

                    {userRole === 'user' &&(<>  <Link to="/logout">
                        <li onClick={handleLogout}><FontAwesomeIcon className="icon" icon={faSignOutAlt}/></li>
                    </Link></>)}

                    {userRole === 'administrator' && (<> <Link to="/manageTree">
                        <li><FontAwesomeIcon className="icon" icon={faProjectDiagram}/></li>
                    </Link>

                        <Link to="/fileUpload">
                            <li><FontAwesomeIcon className="icon" icon={faFileUpload}/></li>
                        </Link></>)}

                    {userRole === 'super-admin' && (<>
                        <Link to="/manageTree">
                            <li><FontAwesomeIcon className="icon" icon={faProjectDiagram}/></li>
                        </Link>
                        <Link to="/manageUsers">
                            <li><FontAwesomeIcon className="icon" icon={faUserCog}/></li>
                        </Link>
                        <Link to="/fileUpload">
                            <li><FontAwesomeIcon className="icon" icon={faFileUpload}/></li>
                        </Link>
                    </>)}
                    
                    {isAuthenticated && (<>
                    <Link to="/logout">
                            <li onClick={handleLogout}><FontAwesomeIcon className="icon" icon={faSignOutAlt}/></li>
                        </Link>
                    </>)}
                </ul>
            </nav>
        </div>
    );
}

export default Nav;
