import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router";

function Register() {
    const [username, setUsername] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const history = useHistory();

     function register() {
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;

        if (username !== "" && mail !== "" && password !== "" && passwordConfirmation !== "" && password === passwordConfirmation) {
            const json = JSON.stringify({mail: mail, pseudo: username, mot_de_passe: password});
            axios.post(url + '/API/Controllers/utilisateur/creerUtilisateur.php', json)
                // axios.post(url + '/API/Controllers/connexion.php', json)
                .then(response => {
                    console.log(response.data);
                    history.push({
                        pathname:  "/login",
                    });
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <div className="LoginRegister">
            <div>
                <h3>Sign up</h3>
                <div className="InputItems">
                    <div>
                        <input type="text" id="username" name="username" required placeholder="     Username"
                               onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <input type="mail" id="mail" name="mail" required placeholder="     Mail"
                               onChange={e => setMail(e.target.value)}/>
                    </div>
                    <div>
                        <input type="password" id="password" name="password" required placeholder="     Password"
                               onChange={e => setPassword(e.target.value)}/>
                    </div>

                    <div>
                        <input type="password" id="passwordConfirmation" name="passwordConfirmation" required
                               placeholder={"     Confirm password"}
                               onChange={e => setPasswordConfirmation(e.target.value)}/>
                    </div>
                </div>

                <div className="action">
                    <button className="button filled" onClick={register}>Sign up</button>
                </div>

            </div>
        </div>
    );
}

export default Register;
