import React from 'react';
import $ from 'jquery';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'

function Issues(props) {

    function next() {
        let checkedBox = $('input:checked').val();
        let allChoices = [];
        $.each($("input"), function () {
            allChoices.push($(this).val());
        });

        if(checkedBox){
            let decision = props.decisions.find(decision => decision.ID_Decision === checkedBox)
            props.changeData(decision.ID_Critere_sortant, decision, allChoices);
        }
    }

    if(props.issue && props.decisions){
        return (
            <div className="Issues">
                <h3>{props.issue.Libelle}</h3>
                <p className="step">Question {props.step}</p>
                <form action="#">
                    {props.decisions.map((decision, i) => {
                        if (decision.ID_Critere_sortant == null) {
                            // 0 == end node
                            decision.ID_Critere_sortant = 0;
                        }
                        return (
                            <div key={decision.ID_Decision}>
                                <input type="radio" name="radio-group" value={decision.ID_Decision}/>
                                <label>{decision.Libelle}</label>
                            </div>
                        )
                    })}
                </form>
                <button onClick={next}>Next<FontAwesomeIcon className="icon" icon={faChevronRight}/></button>
            </div>
        );
    } else {
        return <p>loading...</p>
    }
}

export default Issues;
