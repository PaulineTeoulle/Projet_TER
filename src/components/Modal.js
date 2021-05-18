import React, {useEffect} from "react";
import $ from 'jquery';

function Modal(props) {  

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

    useEffect(() => {
        if(props.open){
            openModal();
        }
    }, [props.open]);

    return (
        <div className="Modal">
            <div>
                <h3>{props.title}</h3>
                <p>{props.message}</p>
                <div className="action">
                    <button className="button filled" onClick={customFunction}>{props.actionButton}</button>
                    <button className="button outlined" onClick={closeModal}>{props.closeButton}</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
