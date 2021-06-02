import React, {useEffect, useState} from "react";
import $ from 'jquery';

function ModalEditCritere(props) {
    const [critere, setCritere] = useState(null);
    const [title, setTitle] = useState(null);

    function customFunction(){
        let label = $('#label').val();
        let informations = $('#informations').val();
        props.mainAction(label, informations)
        closeModal();
    }

    function closeModal() {
        $('.ModalEditCritere').css("display", "none");
        props.close();
        setCritere(null)
    }

    function openModal() {
        $('.ModalEditCritere').css("display", "block");
    }

    useEffect(() => {
        if (props.open) {
            openModal();
            setCritere(props.selectedCritere)
            setTitle(props.title)
        }
    }, [props.open]);


    return (
        <div className="Modal ModalEditCritere">
            {title &&
            <div>
                <h3>{title}</h3>
                <div>
                    {critere &&
                        <form>
                            <input type="text" id="label" name="label" placeholder="label" defaultValue={critere.data.label}/>
                            <input type="text" id="informations" name="informations" placeholder="informations" defaultValue={critere.data.informations}/>
                        </form>
                    }
                    <div className="action">
                        <button className="button filled" onClick={customFunction}>Save</button>
                        <button className="button outlined" onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}

export default ModalEditCritere;
