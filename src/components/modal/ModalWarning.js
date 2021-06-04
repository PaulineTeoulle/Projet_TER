import React, {useEffect} from "react";
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

function ModalWarning(props) {  

    function closeModal(){
        $('.Modal').css("display", "none");
        props.close();
    }

    function openModal(){
        $('.Modal').css("display", "block");
    }


    useEffect(() => {
        if(props.open){
            openModal();
        }
    }, [props.open]);


    return (
        <div className="Modal ModalWarning">
            <div>
                <h3>Warning !</h3>
                <strong><FontAwesomeIcon className="icon" icon={faExclamationTriangle} />cannot save</strong>
                {props.message &&
                    <p>{props.message}</p>
                }
                <div className="action">
                    <button className="button filled" onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default ModalWarning;
