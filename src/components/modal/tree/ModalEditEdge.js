import React, {useEffect, useState} from "react";
import $ from 'jquery';

function ModalEditEdge(props) {
    const [edge, setEdge] = useState(null);
    const [title, setTitle] = useState(null);

    function customFunction(){
        let label = $('#label').val();
        props.mainAction(label)
        closeModal();
    }

    function closeModal() {
        $('.ModalEditEdge').css("display", "none");
        props.close();
        setEdge(null)
    }

    function openModal() {
        $('.ModalEditEdge').css("display", "block");
    }

    useEffect(() => {
        if (props.open) {
            openModal();
            setEdge(props.selectedEdge)
            setTitle(props.title)
        }
    }, [props.open]);

    return (
        <div className="Modal ModalEditEdge">
            {title &&
            <div>
                <h3>{title}</h3>
                <div>
                    {edge &&
                        <form>
                            <input type="text" id="label" name="label" placeholder="label" defaultValue={edge.label}/>
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

export default ModalEditEdge;
