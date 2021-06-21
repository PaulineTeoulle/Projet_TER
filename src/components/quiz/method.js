import React, {useEffect, useState} from 'react';
import axios from 'axios';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChartPie, faClipboard, faFilePdf, faFolderOpen, faUsers} from '@fortawesome/free-solid-svg-icons'

function Method(props) {
    const [checked, setChecked] = useState(false);
    const [ressources, setRessources] = useState(null);

    function finish() {
        props.changeData(0);
    }

    function resume() {
        props.resumeQuiz();
    }

    function toggleValue(){
        setChecked(!checked);
    }


    function getRessources() {
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;

        const json = JSON.stringify({id_methode: Number(props.method.ID_Methode)});
        axios.post(url + '/reactTest/MATUI/API/Controllers/ressource/lireRessourcesMethode.php', json)
            .then(response => {
                setRessources(response.data);
            })
            .catch(error => console.log(error))
    }

    function openFile(name) {
        let protocol = window.location.protocol;
        let host = window.location.hostname;
        let url = protocol + '//' + host;
        window.open(url + '/reactTest/MATUI/src/public/documentsRessources/' + name);
    }

    useEffect(() => {
        getRessources();
    },[]);

    useEffect(() => {
        props.checkedMethod(props.method, checked);
    }, [checked]);

    
    return (
        <div className="Method">
            <div className="methodCard">
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
                                <FontAwesomeIcon className="icon" icon={faChartPie} />  
                                <p>analysis</p>
                                <p>{props.method.Type_analyse}</p>
                            </div>
                        </div>
                        <p>{props.method.Exemple}</p>
                    </div>
                    {ressources ?
                    <div className="ressources">                
                            {ressources.map((element, i) => {   
                                return(<div onClick={() => openFile(element.Nom)} key={i} className="ressource">
                                    <FontAwesomeIcon className="icon" icon={faFilePdf} /> 
                                    <p title={element.Nom}>{element.Nom}</p>
                                </div>)
                            })}
                    </div>
                    : <p>No ressources</p>
                    }
                </div>
                <div className="footer">
                    <label className="switch">
                        <input onChange={toggleValue} type="checkbox"/>
                        <span className="slider round"></span>
                    </label>
                    <span>retain this method</span>
                </div>
            </div>

            <div className="action">
                <button className="button outlined" onClick={finish}>Finish</button>
                <button className="button filled" onClick={resume}>Continue</button>
            </div>
        </div>
    );
}

export default Method;