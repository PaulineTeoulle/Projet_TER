import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import quizIcon from "../public/quiz.svg";
import logoTitle from "../public/LogoThedreTitle.png";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faFileUpload,
    faHome,
    faProjectDiagram,
    faUser,
    faUserCog,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'
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
            <div>
                <img src={logoTitle} alt={'Logo Thedre'}/>
                <nav>
                    <ul>
                        <Link title="home" to="/">
                            <li><FontAwesomeIcon className="icon" icon={faHome}/></li>
                        </Link>
                        <Link title="quiz" to="/quiz">
                            <li><img className="icon quizIcon" src={quizIcon} alt={'icon quiz'}/></li>
                        </Link>

                        {!isAuthenticated && (<>
                            <Link title="login" to="/login">
                                <li><FontAwesomeIcon className="icon" icon={faUser}/></li>
                            </Link>
                        </>)}

                        {userRole === 'administrator' && (<> <Link title="tree management" to="/manageTree">
                            <li><FontAwesomeIcon className="icon" icon={faProjectDiagram}/></li>
                        </Link>

                            <Link title="file uploading" to="/fileUpload">
                                <li><FontAwesomeIcon className="icon" icon={faFileUpload}/></li>
                            </Link></>)}

                        {userRole === 'super-admin' && (<>
                            <Link title="tree management" to="/manageTree">
                                <li><FontAwesomeIcon className="icon" icon={faProjectDiagram}/></li>
                            </Link>
                            <Link title="users management" to="/manageUsers">
                                <li><FontAwesomeIcon className="icon" icon={faUserCog}/></li>
                            </Link>
                            <Link title="file uploading" to="/fileUpload">
                                <li><FontAwesomeIcon className="icon" icon={faFileUpload}/></li>
                            </Link>
                        </>)}

                        {isAuthenticated && (<>
                            <Link title="logout" to="/logout">
                                <li onClick={handleLogout}><FontAwesomeIcon className="icon" icon={faSignOutAlt}/></li>
                            </Link>
                        </>)}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Nav;
