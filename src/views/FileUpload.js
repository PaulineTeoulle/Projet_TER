import React, {useEffect, useState} from "react";
import $ from 'jquery';
import axios from 'axios';
import pdf from '../public/pdf.svg'
import doc from '../public/doc.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTrash } from '@fortawesome/free-solid-svg-icons';
import ModalConfirmation from '../components/modal/ModalConfirmation';

function FileUpload(props) {
    const [file, setFile] = useState(null);
    const [allFiles, setAllFiles] = useState(null);

    // appel la fonction d'upload de fichier avec en parametre le fichier contenu dans file
    function onSubmit(e) {
        e.preventDefault()
        uploadFile(file);
    }

    // stock le fichier dans la variable file
    function onChange(e) {
        setFile(e.target.files[0]);
    }

    // requete d'upload du fichier
    function uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;
        axios.post(url + '/API/Controllers/ressource/uploadFile.php', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(response =>{
            if(response.data.Error){
                alert(response.data.Error);
            }   
            // recharge les fichiers et reset la variable file
            loadFiles();
            setFile(null);
        }).catch(error =>{
            console.log(error);
        });
    }

    // ouvre un fichier stocké sur le serveur
    function openFile(name){
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;
        window.open(url+ '/API/documentsRessources/' + name);
    }

    // supprime un fichier
    function deleteFile(id){
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;
        let data = JSON.stringify({id: Number(id)});
        console.log(data);
        axios({
            method: 'delete',
            url: url+ '/API/Controllers/ressource/supprimerRessource.php',
            data: data
        }).then(response => loadFiles())
    }

    // charge les fichiers
    function loadFiles(){
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;
        axios.get(url + '/API/Controllers/ressource/lire.php')
        .then(response =>{
            setAllFiles(response.data.ressources)
        });
    }

    function getIcon(filename){
        let src = filename.slice(-3);
        let test = false;
        (src == "pdf" ? test = true : test = false);
        switch(test){
            case true:
                return pdf;
            case false:
                return doc;
        }
    }

    useEffect(() => {
        if(file){
            $("form>label").html(file.name);
            $("form>label").css("color", "black");
        } else {
            $("form>label").html("Import file...");
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
                    <label htmlFor="file-upload">Import file...</label>
                    <input id="file-upload" type="file" onChange={onChange}/>
                </form>
                <h3> List of files already uploaded :</h3>
                {allFiles &&
                    <div className="item-list">
                        {allFiles.map((element, i) => {   
                            return (<div className="item" title={element.Nom} key={i}>
                                <p onClick={() => openModal(element)}><FontAwesomeIcon icon={faTrash} /></p>
                                <img onClick={() => openFile(element.Nom)} src={getIcon(element.Nom)} alt="icon pdf"/>
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
