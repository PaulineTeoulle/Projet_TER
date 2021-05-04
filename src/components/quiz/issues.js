import React from 'react';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

function Issues(props) {

    function next(){
        let checkbox = $('input:checked').val();
        props.changeData(checkbox);
    }

    if(props.issue && props.decisions){
        return (
            <div className="Issues">
                <h3>{props.issue.Libelle}</h3>
                <p className="step">Question {props.step}</p>
                <form action="#">
                {props.decisions.map((decision, i) => {     
                    console.log(decision    );                 
                    return (
                        <div key={decision.ID_Decision}>
                            <input type="radio" name="radio-group" value={decision.ID_Critere_sortant}/>
                            <label>{decision.Libelle}</label>
                        </div>
                    ) 
                })}
                </form>    
                <button onClick={next}>Next<FontAwesomeIcon className="icon" icon={faChevronRight} /></button>      
            </div>
        );
    } else {
        return <p>loading...</p>
    }
}

export default Issues;
