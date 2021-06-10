import React, {useContext, useState} from 'react';
import Auth from "../contexts/Auth";
import {login, isUser} from "../services/AuthApi";
import 'font-awesome/css/font-awesome.min.css';

const Login = (props) => {

    //Utilisation du contexte pour vérifier les états de connexion
    const {setIsAuthenticated, setUserRole } = useContext(Auth);

    const [user, setUser] = useState({
        username: "",
        mot_de_passe: ""
    });

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({...user, [name]: value})
    }

    const handleSubmit = async event => {
        event.preventDefault();

        //Set les états du contexte quand on est connecté
        try {
            const response = await login(user);
            if(response === false){
                props.history.push({
                    pathname: '/login',
                    state: { error: "Error, incorrect password or username" }
                })
            }
            else {
                setIsAuthenticated(response);
                let userRole = isUser();
                if(userRole){
                    setUserRole(userRole)
                }
                props.history.push('/quiz')
            }

        } catch ({response}) {
            console.log(response);
        }
    }

    const change = () => {
        props.history.push('/register')
    }

    // useEffect(() => {
    //    // Redirection si déjà loggé et sur la page login
    //     if (isAuthenticated) {
    //         history.replace('/home')
    //     }
    //
    // }, [history, isAuthenticated]);


    return (
        <div className="LoginRegister">
            <div>
                <h3>Sign in</h3>
                <div className="InputItems">
                    <div>
                        <input className ="inputIcon" type="text" id="username" name="username" required placeholder="    Username"
                            onChange={handleChange}/>
                    </div>

                    <div>
                        <input className ="inputIcon" type="password" id="password" name="mot_de_passe" required placeholder={"    Password"}
                            onChange={handleChange}/>
                    </div>
                </div>
                {props.location.state &&(<p className="error">{props.location.state.error}</p>)}

                <div className="action">
                    <button className="button filled" onClick={handleSubmit}>Sign in</button>
                </div>

                <div className="signup">
                    <p>Don't have an account ? <a onClick={change}>Create one now</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;