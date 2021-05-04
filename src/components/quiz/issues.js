import React from 'react';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

function Issues(props) {

    function next(){
        let checkbox = $('input:checked').val();
        props.changeData(checkbox);
    }

    return (
        <div className="Issues">
            <h3>Label question</h3>
            <p className="step">Question {props.data}</p>
            <form action="#">
                <div>
                    <input type="radio" id="1" name="radio-group" value="1"/>
                    <label>Choix 1</label>
                </div>
                <div>
                    <input type="radio" id="2" name="radio-group" value="2"/>
                    <label>Choix 2</label>
                </div>
                <div>
                    <input type="radio" id="3" name="radio-group" value="3"/>
                    <label>Choix 3</label>
                </div>
            </form>    
            <button onClick={next}>Next<FontAwesomeIcon className="icon" icon={faChevronRight} /></button>      
        </div>
    );
}

export default Issues;
