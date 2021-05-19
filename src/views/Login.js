import React, {useState} from 'react';


function Login({props}) {    
    const [age, setAge] = useState(20);

    function handleAge() {
        setAge(age + 1);
    }
    
    return (
        <div className="Login">
            <p>login page</p>
        </div>
    );
}

export default Login;
