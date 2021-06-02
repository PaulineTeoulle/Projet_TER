import React, {useEffect, useState} from "react";
import $ from 'jquery';

function ModalEditEndNode(props) {
    const [endNode, setEndNode] = useState(null);
    const [title, setTitle] = useState(null);

    function customFunction(){
        let message = $('#message').val();
        props.mainAction(message)
        closeModal();
    }

    function closeModal() {
        $('.ModalEditEndNode').css("display", "none");
        props.close();
        setEndNode(null)
    }

    function openModal() {
        $('.ModalEditEndNode').css("display", "block");
    }

    useEffect(() => {
        if (props.open) {
            openModal();
            setEndNode(props.selectedEndNode)
            setTitle(props.title)
        }
    }, [props.open]);

    return (
        <div className="Modal ModalEditEndNode">
            {title &&
            <div>
                <h3>{title}</h3>
                <div>
                    {endNode &&
                        <form>
                            <input type="text" id="message" name="message" placeholder="message" defaultValue={endNode.data.message}/>
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

export default ModalEditEndNode;
