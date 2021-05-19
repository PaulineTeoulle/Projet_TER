import React, {useEffect, useState} from "react";
import $ from 'jquery';


function ModalSignUp(props) {
    const [username, setUsername] = useState(null);
    const [mail, setMail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordConfirmation, setPasswordConfirmation] = useState(null);

    function customFunction() {
        props.mainAction();
        closeModal();
    }

    function changeUsername(e) {
        setUsername(e.target.value);
        props.changeUsername(e.target.value);
    }

    function changeMail(e) {
        setMail(e.target.value);
        props.changeMail(e.target.value);
    }

    function changePassword(e) {
        setPassword(e.target.value);
        props.changeUsername(e.target.value);
    }

    function changePasswordConfirmation(e) {
        setPasswordConfirmation(e.target.value);
    }


    function closeModal() {
        $('.ModalSignUp').css("display", "none");
        props.close();
    }

    function openModal() {
        $('.ModalSignUp').css("display", "block");
    }

    useEffect(() => {
        if (props.open) {
            openModal();
        }
    }, [props.open]);

    return (
        <div className="Modal ModalSignUp">
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
                        {/*<FontAwesomeIcon className="icon" icon={faEnvelope}/>*/}
                        <input type="mail" id="mail" name="mail" required placeholder="    Mail"
                               onChange={changeMail}/>
                    </div>
                    <div>
                        {/*<FontAwesomeIcon className="icon" icon={faLock}/>*/}
                        <input type="password" id="password" name="password" required placeholder={"     Password"}
                               onChange={changePassword}/>
                    </div>

                    <div>
                        {/*<FontAwesomeIcon className="icon" icon={faLock}/>*/}
                        <input type="password" id="confirmPassword" name="confirmPassword" required
                               placeholder="     Confirm Password" onChange={changePasswordConfirmation}/>
                    </div>
                </div>
                <div className="action">
                    <button className="button outlined" onClick={closeModal}>{props.closeButton}</button>
                    <button className="button filled" onClick={customFunction}>{props.actionButton}</button>
                </div>
            </div>
        </div>
    );
}

export default ModalSignUp;
