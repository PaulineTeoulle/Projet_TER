import React from 'react';
import $ from 'jquery';
import Loader from '../Loader'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronRight, faInfoCircle} from '@fortawesome/free-solid-svg-icons'


function Issues(props) {

    const [infoOpen, setIsOpen] = React.useState(false);

    function next() {
        let checkedBox = $('input:checked').val();
        let allChoices = [];
        $.each($("input"), function () {
            allChoices.push($(this).val());
        });

        if (checkedBox) {
            let decision = props.decisions.find(decision => decision.ID_Decision === checkedBox)
            props.changeData(decision.ID_Critere_sortant, decision, allChoices);
        }
    }

    function togglePanel() {
        setIsOpen(!infoOpen);
    }


    if (props.issue && props.decisions) {
        return (
            <div className="Issues">

                {props.issue.Informations != null ?
                    <h3><FontAwesomeIcon className="issueInfoIcon" icon={faInfoCircle}
                        onClick={(e) => togglePanel(e)}/> {props.issue.Libelle} </h3>
                    : <h3> {props.issue.Libelle}</h3>}

                {infoOpen ?
                    <div className="content">
                        <p aria-label={"info"}>{props.issue.Informations}</p>
                    </div>
                    : null}

                <p className="step">Question {props.step}</p>
                <form action="#">
                    {props.decisions.map((decision, i) => {
                        if(decision.ID_Critere_sortant == null){
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
        return <Loader/>
    }
}

export default Issues;
