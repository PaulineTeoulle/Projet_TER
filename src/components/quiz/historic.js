import React, {useState, useRef} from 'react';

import Modal from "../Modal";
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndoAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

function Historic(props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedElement, setSelectedElement] = useState(null);

    function openModal(element){
        setModalOpen(true);
        setSelectedElement(element)
    }

    function closeModal(){
        setModalOpen(false);
    }

    function back(element){
        let ID;
        let type;
        if ('issue' in element) {
            ID = element.issue.ID_Critere;
            type = 'issue';
        }
        if ('method' in element) {
            ID = element.method.ID_Methode;
            type = 'method';
        }
        props.backOut(ID, type);
    }

    function undo(){
        if(props.historic.length > 1){
            let element = props.historic[props.historic.length - 2];
            back(element);
        }
    }

    return (
        <div className="Historic">
            <div className="historic-header">
                <h3>Progression</h3>
                <FontAwesomeIcon onClick={undo} className="icon" icon={faUndoAlt} />
            </div>
            {props.historic ?
                <ul>
                {props.historic.map((element, i) => {   
                        return (
                            <li onClick={openModal.bind(this, element)} key={i}>
                                    <p title={element.issue ? element.issue.Libelle : element.method.Libelle}>{element.issue ? element.issue.Libelle : element.method.Libelle}</p>
                                    {element.decision &&
                                        <p>{element.decision.Libelle}</p>
                                    }  
                                    {element.checked &&
                                        <FontAwesomeIcon className="icon" icon={faCheckCircle} />
                                    }                            
                            </li>
                        ) 
                    })}
                </ul>
                : <div>Loading...</div>
            }
            <Modal
                title="attention"
                message="sur de toi ?"
                open={modalOpen}  
                close={closeModal}
                mainAction={back}
                mainActionParameters={selectedElement}
            />
        </div>
    );
}

export default Historic;

