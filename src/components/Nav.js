import React from 'react';
import {Link} from 'react-router-dom';

function Nav() {
    return (
        <div className="Navigation">
            <nav>
                <ul>
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to="/quiz">
                        <li>Quiz</li>
                    </Link>
                    <Link to="/manageTree">
                        <li>Tree</li>
                    </Link>
                    <Link to="/manageUsers">
                        <li>Users</li>
                    </Link>
                    <Link to="/fileUpload">
                        <li>FileUpload</li>
                    </Link>
                </ul>
            </nav>
        </div>
    );
}

export default Nav;
