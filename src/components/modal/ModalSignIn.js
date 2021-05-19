import React, {useEffect, useState} from "react";
import $ from 'jquery';


function ModalSignIn(props) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    function customFunction() {
        props.mainAction();
        closeModal();
    }

    function changeUsername(e) {
        setUsername(e.target.value);
        props.changeUsername(e.target.value);
    }

    function changePassword(e) {
        setPassword(e.target.value);
        props.changeUsername(e.target.value);
    }

    function closeModal() {
        $('.ModalSignIn').css("display", "none");
        props.close();
    }

    function openModal() {
        $('.ModalSignIn').css("display", "block");
    }

    useEffect(() => {
        if (props.open) {
            openModal();
        }
    }, [props.open]);

    return (
        <div className="Modal ModalSignIn">
            <div>
                <h3>{props.title}</h3>
                <p>{props.message}</p>
                <div className="InputItems">
                    <div>
                        {/*<FontAwesomeIcon className="icon" icon={faUser}/>*/}
                        <input type="text" id="username" name="username" required placeholder="     Username"
                               onChange={changeUsername}/>
                    </div>

                    <div>
                        {/*<FontAwesomeIcon className="icon" icon={faLock}/>*/}
                        <input type="password" id="password" name="password" required placeholder={"     Password"}
                               onChange={changePassword}/>
                    </div>
                </div>

                <div className="action">
                    <button className="button outlined" onClick={closeModal}>{props.closeButton}</button>
                    <button className="button filled" onClick={customFunction}>{props.actionButton}</button>

                </div>

                <div className="signup">
                    <p>Don't have an account ? <a href="/register">Create one now</a></p>
                </div>
            </div>
        </div>
    );
}

export default ModalSignIn;
