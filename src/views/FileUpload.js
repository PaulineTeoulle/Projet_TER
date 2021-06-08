import React, {useEffect, useState} from "react";
import $ from 'jquery';
import axios from 'axios';

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
            loadFiles();
        });
    }

    function openFile(name){
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;
        window.open(url + '/reactTest/MATUI/src/public/documentsRessources/' + name);
    }

    function deleteFile(id){
        const formData = new FormData();
        formData.append('id', id);
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;
        axios.delete(url + '/reactTest/MATUI/API/Controllers/ressource/supprimerRessource.php', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(response =>{
            loadFiles();
        });
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
        if(!allFiles){
            loadFiles();
        }
    }, []);

    console.log(allFiles)

    return (
        <div className="FileUpload">
            {allFiles &&
                <div>
                    {allFiles.map((element, i) => {   
                        return (<div  key={i}>
                            <p onClick={() => openFile(element.Nom)}>{element.Nom}</p>
                            <p onClick={() => deleteFile(element.ID_Ressource)}>delete</p>
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
    );
}

export default FileUpload;
