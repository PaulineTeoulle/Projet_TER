import React, {useEffect} from "react";
import $ from 'jquery';

function ModalEditRole(props) {

    function customFunction() {
        props.mainAction(props.mainActionParameters)
        closeModal();
    }

    function changeValue(e) {
        props.changeAction(e.target.value);
    }

    function closeModal() {
        $('.ModalEditRole').css("display", "none");
        props.close();
    }

    function openModal() {
        $('.ModalEditRole').css("display", "block");
    }

    useEffect(() => {
        if (props.open) {
            openModal();
        }
    }, [props.open]);

    return (
        <div className="Modal ModalEditRole">
            <div>
                <h3>{props.title}</h3>
                <p>{props.message}</p>
                <div>
                    <select id="select" onChange={changeValue}>
                        <option id="option" value="administrator">Administrator</option>
                        <option id="option" value="user">User</option>
                        <option id="option" value="super-admin">Super-administrator</option>
                    </select>
                    <div className="action">
                        <button className="button outlined" onClick={closeModal}>{props.closeButton}</button>
                        <button className="button filled" onClick={customFunction}>{props.actionButton}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalEditRole;
