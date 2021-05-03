import React, {useState} from 'react';


function Exemple({message}) {    
    const [age, setAge] = useState(20);

    function handleAge() {
        setAge(age + 1);
    }
    
    return (
        <div className="Exemple">
            <h1>Exemple page</h1>
            <p>{message}</p>
            <p>variable age du state : {age}</p>
            <button onClick={() => handleAge()}>Change age +</button>
        </div>
    );
}

export default Exemple;
