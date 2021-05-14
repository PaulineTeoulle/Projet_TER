import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndoAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

function Historic(props) {

    function back(element){
        let ID;
        let type;
        if ('issue' in element) {
            ID = element.issue.ID_Critere;
            type = 'issue';
        }
        if ('method' in element) {
            ID = element.method.ID_Methode;
            type = 'method';
        }
        props.backOut(ID, type);
    }

    function undo(){
        if(props.historic.length > 1){
            let element = props.historic[props.historic.length - 2];
            back(element);
        }
    }

    return (
        <div className="Historic">
            <div className="historic-header">
                <h3>Progression</h3>
                <FontAwesomeIcon onClick={undo} className="icon" icon={faUndoAlt} />
            </div>
            {props.historic ?
                <ul>
                {props.historic.map((element, i) => {   
                        return (
                            <li onClick={back.bind(this, element)} key={i}>
                                    <p>{element.issue ? element.issue.Libelle : element.method.Libelle}</p>
                                    {element.decision &&
                                        <p>{element.decision.Libelle}</p>
                                    }  
                                    {element.checked &&
                                        <FontAwesomeIcon className="icon" icon={faCheckCircle} />
                                    }                            
                            </li>
                        ) 
                    })}
                </ul>
                : <div>Loading...</div>
            }
        </div>
    );
}

export default Historic;

