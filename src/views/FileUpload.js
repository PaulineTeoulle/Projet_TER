import React, {useEffect, useState} from "react";
import $ from 'jquery';
import axios from 'axios';
import pdf from '../public/pdf.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTrash } from '@fortawesome/free-solid-svg-icons';
import ModalConfirmation from '../components/modal/ModalConfirmation';

function FileUpload(props) {
    const [file, setFile] = useState(null);
    const [allFiles, setAllFiles] = useState(null);

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
        }).then(response =>{
            if(response.data.Error){
                alert(response.data.Error);
            }   
            loadFiles();
            setFile(null);
        }).catch(error =>{
            console.log(error);
        });
    }

    function openFile(name){
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;
        window.open(url + '/reactTest/MATUI/src/public/documentsRessources/' + name);
    }

    function deleteFile(id){
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;
        let data = JSON.stringify({id: Number(id)});
        console.log(data);
        axios({
            method: 'delete',
            url: url+ '/reactTest/MATUI/API/Controllers/ressource/supprimerRessource.php',
            data: data
        }).then(response => loadFiles())
    }

    function loadFiles(){
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;
        axios.get(url + '/reactTest/MATUI/API/Controllers/ressource/lire.php')
        .then(response =>{
            setAllFiles(response.data.ressources)
        });
    }

    useEffect(() => {
        if(file){
            $("form>label").html(file.name);
            $("form>label").css("color", "black");
        } else {
            $("form>label").html("Choose file...");
            $("form>label").css("color", "lightgray");
        }
    }, [file]);

    useEffect(() => {
        if(!allFiles){
            loadFiles();
        }
    }, []);

    // Modal management
    const [modalOpen, setModalOpen] = useState(false);
    const [message, setMessage] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);

    function openModal(element) {
        setModalOpen(true);
        setMessage("Do you want to delete " + element.Nom + " ?")
        setSelectedElement(element.ID_Ressource)
    }

    function closeModal(){
        setModalOpen(false);
    }

    return (
        <div className="FileUpload">
            <div>
                <form onSubmit={onSubmit}>
                    <button className="filled submit-button" type="submit">                        
                        <FontAwesomeIcon icon={faUpload} />
                    </button>
                    <label htmlFor="file-upload">Choose file...</label>
                    <input id="file-upload" type="file" onChange={onChange}/>
                </form>        
                {allFiles &&
                    <div className="item-list">
                        {allFiles.map((element, i) => {   
                            return (<div className="item" title={element.Nom} key={i}>
                                <p onClick={() => openModal(element)}><FontAwesomeIcon icon={faTrash} /></p>
                                <img onClick={() => openFile(element.Nom)} src={pdf} alt="icon pdf"/>
                                <p onClick={() => openFile(element.Nom)}>{element.Nom}</p>
                                </div>
                            ) 
                            
                        })}    
                    </div>
                }  
            </div>

            <ModalConfirmation
                title="Warning"
                message={message}
                open={modalOpen}  
                close={closeModal}
                mainAction={deleteFile}
                mainActionParameters={selectedElement}
                mainActionName="Delete"
            />

        </div>
    );
}

export default FileUpload;
