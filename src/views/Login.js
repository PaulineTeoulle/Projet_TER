import React, {useState, useEffect} from 'react';
import axios from 'axios';


function Login({props}) {    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function sendConnection(){
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;

        const json = JSON.stringify({id_methode: Number(props.method.ID_Methode)});
        axios.post(url + '/reactTest/MATUI/API/Controllers/ressource/lireRessourcesMethode.php', json)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        console.log(username)
    }, [username]);

       useEffect(() => {
        console.log(password)
    }, [password]);
    
    return (
        <div className="Login">
            <form>
                <div>
                    <input type="text" id="username" name="username" required placeholder="Username" 
                    value={username} onChange={e => setUsername(e.target.value)}/>
                </div>

                <div>
                    <input type="password" id="password" name="password" required placeholder="Password"
                    value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
            </form>

            <div className="action">
                <button onClick={sendConnection}>connect</button>
            </div>

            <div className="signup">
                <p>Don't have an account ? <a href="/register">Create one now</a></p>
            </div>
        </div>
    );
}

export default Login;
