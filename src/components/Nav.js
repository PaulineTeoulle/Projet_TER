import React from 'react';
import {Link} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faProjectDiagram, faUser, faUserCog, faHome, faQuestion, faFileUpload, faFile } from '@fortawesome/free-solid-svg-icons'

function Nav() {
    return (
        <div className="Navigation">
            <nav>
                <ul>
                    <Link to="/">
                        <li><FontAwesomeIcon className="icon" icon={faHome} /></li>
                    </Link>
                    <Link to="/quiz">
                        <li><FontAwesomeIcon className="icon" icon={faQuestion} /></li>
                    </Link>
                    <Link to="/manageTree">
                        <li><FontAwesomeIcon className="icon" icon={faProjectDiagram} /></li>
                    </Link>
                    <Link to="/login">
                        <li><FontAwesomeIcon className="icon" icon={faUser} /></li>
                    </Link>
                    <Link to="/manageUsers">
                        <li><FontAwesomeIcon className="icon" icon={faUserCog} /></li>
                    </Link>
                    <Link to="/fileUpload">
                        <li><FontAwesomeIcon className="icon" icon={faFileUpload} /></li>
                    </Link>
                </ul>
            </nav>
        </div>
    );
}

export default Nav;
