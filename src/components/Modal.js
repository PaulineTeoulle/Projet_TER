import React, {useEffect, useState} from "react";
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

    function buildComponent(){
        return React.createElement(props.component)
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
                {props.message &&
                    <p>{props.message}</p>
                }
                {props.component &&
                    buildComponent()
                }
                <div className="action">
                    <button className="button filled" onClick={customFunction}>{props.mainActionName}</button>
                    <button className="button outlined" onClick={closeModal}>{props.secondaryActionName}</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
