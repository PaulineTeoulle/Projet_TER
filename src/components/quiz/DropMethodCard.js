import React, {useEffect, useState} from 'react';

import $ from 'jquery';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChartPie, faClipboard, faFilePdf, faFolderOpen, faSortDown, faUsers} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

function DropMethodCard(props) {

    const [ressources, setRessources] = useState(null);


    function getRessources() {
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;

        const json = JSON.stringify({id_methode: Number(props.method.ID_Methode)});
        axios.post(url + '/API/Controllers/ressource/lireRessourcesMethode.php', json)
            .then(response => {
                setRessources(response.data);
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getRessources();
    }, []);


    function openFile(name) {
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;
        window.open(url+ '/API/documentsRessources/' + name);
    }

    function dropCard(e) {
        let parentId = e.currentTarget.parentElement.id;
        console.log(parentId)
        $("#" + parentId).toggleClass('dropped');
    }

    return (
        <div className="Method">
            <div id={props.id} className="methodCard dropDown">
                <div className="header">
                    <div className="informations">
                        <h3>{props.method.Libelle}</h3>
                        <p>{props.method.Description}</p>
                        <div>
                            <div>
                                <FontAwesomeIcon className="icon" icon={faUsers} />  
                                <p>workforce</p> 
                                <p>{props.method.Effectif_preconise}</p>
                            </div>
                            <div>
                                <FontAwesomeIcon className="icon" icon={faFolderOpen} />  
                                <p>produced data</p> 
                                <p>{props.method.Donnees_produites}</p>
                            </div>
                            <div>
                                <FontAwesomeIcon className="icon" icon={faClipboard} />  
                                <p>method</p>
                                <p>{props.method.Type_methode}</p>
                            </div>
                            <div>
                                <FontAwesomeIcon className="icon" icon={faChartPie}/>
                                <p>analysis</p>
                                <p>{props.method.Type_analyse}</p>
                            </div>
                        </div>
                        <p>{props.method.Exemple}</p>
                    </div>
                    {ressources ?
                        <div className="ressources">
                            {ressources.map((element, i) => {
                                return (<div onClick={() => openFile(element.Nom)} key={i} className="ressource">
                                    <FontAwesomeIcon className="icon" icon={faFilePdf}/>
                                    <p>{element.Nom}</p>
                                </div>)
                            })}
                        </div>
                        : <p>No ressources</p>
                    }
                </div>
                <div onClick={(e) => dropCard(e)} className="deploy">
                    <FontAwesomeIcon icon={faSortDown}/>
                </div>
            </div>
        </div>
    );
}

export default DropMethodCard;
