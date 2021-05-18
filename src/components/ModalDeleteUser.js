import React, {useEffect} from "react";
import $ from 'jquery';

function ModalDeleteUser(props) {

    function customFunction() {
        props.mainAction(props.mainActionParameters)
        closeModal();
    }

    function closeModal() {
        $('.ModalDeleteUser').css("display", "none");
        props.close();
    }

    function openModal() {
        $('.ModalDeleteUser').css("display", "block");
    }

    useEffect(() => {
        if (props.open) {
            openModal();
        }
    }, [props.open]);
    return (
        <div className="ModalDeleteUser">
            <div>
                <h3>{props.title}</h3>
                <p>{props.message}</p>
                <div>
                    <div className="action">
                        <button className="button outlined" onClick={closeModal}>{props.closeButton}</button>
                        <button className="button filled" onClick={customFunction}>{props.actionButton}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalDeleteUser;
