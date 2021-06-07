import React, {useEffect, useState} from "react";
import $ from 'jquery';
import axios from 'axios';

function ModalEditMethod(props) {
    const [method, setMethod] = useState(null);
    const [resources, setResources] = useState(null);
    const [title, setTitle] = useState(null);
    const [file, setFile] = useState(null);

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
        props.mainAction(data)
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

    function onSubmit(e) {
        e.preventDefault()
        uploadFile(file);
    }

    function onChange(e) {
        setFile(e.target.files[0]);
    }

    function uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;
        axios.post(url + '/reactTest/MATUI/API/Controllers/ressource/uploadFile.php', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(response => console.log(response.data));
    }

    function openFile(name){
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;
        window.open(url + '/reactTest/MATUI/src/public/documentsRessources/' + name);
    }

    useEffect(() => {
        if (props.open) {
            openModal();
            setMethod(props.selectedMethod)
            setTitle(props.title)
        }
    }, [props.open]);

    useEffect(() => {
        if (method && props.resources) {
            setResources(props.resources[method.id.slice(1)])
        }
    }, [method]);

    console.log(props.resources)

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
                            <select name="pets" id="pet-select">
                                <option value="">--Please choose an option--</option>
                            </select>
                            {resources &&
                                <div>
                                {resources.map((element, i) => {   
                                    return (<div key={i} onClick={() => openFile(element.Nom)}>
                                        <p>{element.Nom}</p>
                                        </div>
                                    ) 
                                })}    
                                </div>
                            }  
                            <form onSubmit={onSubmit}>
                                <h1>Upload File</h1>
                                <input type="file" onChange={onChange}/>
                                <button type="submit">Upload File</button>
                            </form>  
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
