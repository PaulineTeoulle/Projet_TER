import React, {useEffect, useState} from "react";
import $ from 'jquery';

/*
Parametre obligatoire : 
    - title
    - open (bool qui spécifie l'état de la modale)
    - close (function de retour pour gérer l'état de la modal)
    - mainAction (function bind au primary button)
    - mainActionParameter (parametre de cette function => donner un tableau pour plusieurs parametres)
    - mainActionName (nom du button)

Parametre optionnel :
    - message
    - component (permet de bind un component)
*/
function ModalConfirmation(props) {  

    function customFunction(){
        props.mainAction(props.mainActionParameters)
        closeModal();
    }

    function closeModal(){
        $('.Modal').css("display", "none");
        props.close();
    }

    function openModal(){
        $('.Modal').css("display", "block");
    }

    function buildComponent(){
        return React.createElement(props.component, [props.age])
    }

    useEffect(() => {
        if(props.open){
            openModal();
        }
    }, [props.open]);


    return (
        <div className="Modal ModalConfirmation">
            <div>
                <h3>{props.title}</h3>
                {props.message &&
                    <p>{props.message}</p>
                }
                {props.component &&
                    buildComponent()
                }
                <div className="action">
                    <button className="button filled" onClick={customFunction}>{props.mainActionName}</button>
                    <button className="button outlined" onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirmation;
