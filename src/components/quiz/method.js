import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faFolderOpen, faClipboard, faChartPie, faFilePdf } from '@fortawesome/free-solid-svg-icons'

function Method(props) {

    function finish(){
        props.changeData(0);
    }

    function resume(){
        props.resumeQuiz();
    }

    return (
        <div className="Method">
            <div className="methodCard">
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
                <div className="ressources">
                    <FontAwesomeIcon className="icon" icon={faFilePdf} />  
                </div>
            </div>

            <div className="action">
                <button className="button outlined" onClick={finish}>finish</button>
                <button className="button filled" onClick={resume}>continue</button>
            </div>
        </div>
    );
}

export default Method;
