import React, {useContext, useState} from 'react';
import Auth from "../contexts/Auth";
import {login, isUserRole, isAdminRole, isSuperAdminRole} from "../services/AuthApi";

const Login = ({history}) => {

    //Utilisation du contexte pour vérifier les états de connexion
    const {setIsAuthenticated ,setIsUser, setIsAdmin, setIsSuperAdmin } = useContext(Auth);

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
            setIsAuthenticated(response);
            if(isUserRole()){
                setIsUser(true);
            }
            else if (isAdminRole()){
                setIsAdmin(true);
            }
           else if (isSuperAdminRole()){
               setIsSuperAdmin(true);
            }
            history.replace('/quiz')
        } catch ({response}) {
            console.log(response);
        }
    }
    //
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
                        <input type="text" id="username" name="username" required placeholder="     Username"
                               onChange={handleChange}/>
                    </div>

                    <div>
                        <input type="password" id="password" name="mot_de_passe" required placeholder={"     Password"}
                               onChange={handleChange}/>
                    </div>
                </div>

                <div className="action">
                    <button className="button filled" onClick={handleSubmit}>Sign in</button>
                </div>

                <div className="signup">
                    <p>Don't have an account ? <a href={"/register"}>Create one now</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
