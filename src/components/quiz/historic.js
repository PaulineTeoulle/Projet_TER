import React from 'react';

function Historic(props) {
    return (
        <div className="Historic">
            <h3>Progression</h3>
            <ul>
            {props.historic.map((element, i) => {     
                    return (
                        <li key={i}>
                            <p>{element.issue.Libelle}</p>
                            <p>{element.decision.Libelle}</p>
                        </li>
                    ) 
                })}
            </ul>
        </div>
    );
}

export default Historic;
