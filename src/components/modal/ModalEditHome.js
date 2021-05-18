import React, {useEffect, useState} from "react";
import $ from 'jquery';

function ModalEditHome(props) {
    const [description, setDescription] = useState(props.oldDescription);

    function customFunction() {
        props.mainAction();
        closeModal();
    }


    function changeValue(e) {
        setDescription(e.target.value);
        props.changeAction(e.target.value);

    }


    function closeModal() {
        $('.ModalEditHome').css("display", "none");
        props.close();
    }

    function openModal() {
        $('.ModalEditHome').css("display", "block");

    }

    useEffect(() => {
        if (props.open) {
            openModal();
        }
    }, [props.open]);

    return (
        <div className="ModalEditHome">
            <div>
                <h3>{props.title}</h3>
                <p>{props.message}</p>
                <div className="container">
                    <div className="text">
                        <textarea className="textinput" rows="16" cols="132" maxLength="1978"
                                  value={description} onChange={changeValue}/>
                    </div>
                </div>

                <div className="action">
                    <button className="button outlined" onClick={closeModal}>{props.closeButton}</button>
                    <button className="button filled" onClick={customFunction}>{props.actionButton}</button>
                </div>
            </div>
        </div>
    );
}

export default ModalEditHome;
