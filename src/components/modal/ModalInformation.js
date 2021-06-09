import React, {useEffect} from "react";
import $ from 'jquery';

function ModalInformation(props) {  

    function closeModal(){
        $('.ModalInformation').css("display", "none");
        props.close();
    }

    function openModal(){
        $('.ModalInformation').css("display", "block");
    }


    useEffect(() => {
        if(props.open){
            openModal();
        }
    }, [props.open]);


    return (
        <div className="Modal ModalInformation">
            <div>
                <h3>Succes !</h3>
                <p>Tree has been save</p>
                <div className="action">
                    <button className="button filled" onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default ModalInformation;
