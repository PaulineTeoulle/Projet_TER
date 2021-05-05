import React from 'react';

function Historic(props) {

    function back(element){
        props.backOut(element.issue.ID_Critere);
    }

    return (
        <div className="Historic">
            <h3>Progression</h3>
            <ul>
            {props.historic.map((element, i) => {   
                console.log(props.historic)  
                    return (
                        <li onClick={back.bind(this, element)} key={i}>
                                <p>{element.issue.Libelle}</p>
                                <p>{element.decision ? element.decision.Libelle : ""}</p>
                            
                        </li>
                    ) 
                })}
            </ul>
        </div>
    );
}

export default Historic;
