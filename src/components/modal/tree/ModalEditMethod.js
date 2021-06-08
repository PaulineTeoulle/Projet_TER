import React, {useEffect, useState} from "react";
import $ from 'jquery';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function ModalEditMethod(props) {
    const [method, setMethod] = useState(null);
    const [resources, setResources] = useState(null);
    const [allResources, setAllResources] = useState(null);
    const [title, setTitle] = useState(null);

    function customFunction(){
        let data = {
            label: $('#label').val(),
            description: $('#description').val(),
            productedData: $('#productedData').val(),
            workforce: $('#workforce').val(),
            method: $('#method').val(),
            analysis: $('#analysis').val(),
            exemple: $('#exemple').val()
        }
        props.mainAction(data, resources)
        closeModal();
    }

    function closeModal() {
        $('.ModalEditMethod').css("display", "none");
        props.close();
        setMethod(null)
    }

    function openModal() {
        $('.ModalEditMethod').css("display", "block");
    }

    function addFile(){
        let selectedFileId = $('select').val();
        if(selectedFileId){
            let selectedFile = props.initialTree.ressources.find(item => item.ID_Ressource === selectedFileId.toString());
            setResources(resources.concat(selectedFile));
        }
    }

    function openFile(name){
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;
        window.open(url + '/reactTest/MATUI/src/public/documentsRessources/' + name);
    }

    function initResources(resources, methodesRessources, method){
        // ressources lié a notre methode
        let methodeRessources = methodesRessources.filter(item => item.ID_Methode === method.id.slice(1));
        // prépare le tableau des ressources
        let ressources = []
        methodeRessources.forEach(element => {
            // push les ressources de la méthode a partir du tableau de liaison
            let ressource = resources.find(item => item.ID_Ressource === element.ID_Ressource);
            ressources.push(ressource)
        })
        setResources(ressources);
    }

    useEffect(() => {
        if (props.open) {
            openModal();
            setMethod(props.selectedMethod)
            setTitle(props.title)
            setAllResources(props.initialTree.ressources);
            initResources(props.initialTree.ressources, props.initialTree.methodesRessources, props.selectedMethod)
        }
    }, [props.open]);

    useEffect(() => {
        if (method && props.resources) {
            setResources(props.resources[method.id.slice(1)])
        }
    }, [method]);

    return (
        <div className="Modal ModalEditMethod">
            {title &&
            <div>
                <h3>{title}</h3>
                <div>
                    <div className="content">
                        {method &&
                            <form>
                                <input type="text" id="label" name="label" placeholder="label" defaultValue={method.data.label}/>
                                <input type="text" id="description" name="description" placeholder="description" defaultValue={method.data.description}/>
                                <input type="text" id="workforce" name="workforce" placeholder="workforce" defaultValue={method.data.workforce}/>
                                <input type="text" id="productedData" name="productedData" placeholder="productedData" defaultValue={method.data.productedData}/>
                                <input type="text" id="method" name="method" placeholder="method" defaultValue={method.data.method}/>
                                <input type="text" id="analysis" name="analysis" placeholder="analysis" defaultValue={method.data.analysis}/>
                                <input type="text" id="exemple" name="exemple" placeholder="exemple" defaultValue={method.data.exemple}/>     
                            </form>
                        }
                        <div className="ressources">
                            <div className="selector">
                                {allResources &&
                                    <select name="pets" id="pet-select">
                                        <option value="">Choose method</option>
                                        {allResources.map((element, i) => {   
                                            if(!resources.find(item => item.ID_Ressource === element.ID_Ressource)){
                                                return (
                                                    <option key={i} value={element.ID_Ressource}>{element.Nom}</option>
                                                ) 
                                            }
                                        })}    
                                    </select>
                                }
                                <button onClick={addFile}><FontAwesomeIcon className="icon" icon={faPlus} />
</button>
                            </div>
                            {resources &&
                                <div>
                                {Object.keys(resources).map(function(keyName, keyIndex) {
                                    return (<div className="item" key={keyName} onClick={() => openFile(resources[keyName].Nom)}>
                                        <p>{resources[keyName].Nom}</p>
                                        </div>
                                    ) 
                                })}    
                                </div>
                            }  
                            {/* <form onSubmit={onSubmit}>
                                <h1>Upload File</h1>
                                <input type="file" onChange={onChange}/>
                                <button type="submit">Upload File</button>
                            </form>   */}
                        </div>      
                    </div>   
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

export default ModalEditMethod;
