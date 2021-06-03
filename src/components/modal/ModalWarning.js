import React, {useEffect} from "react";
import $ from 'jquery';

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
                {props.message &&
                    <p>{props.message}</p>
                }
                <div className="action">
                    <button className="button outlined" onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default ModalWarning;
