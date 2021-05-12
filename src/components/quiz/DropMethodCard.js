import React from 'react';

import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faFolderOpen, faClipboard, faChartPie, faFilePdf, faSortDown } from '@fortawesome/free-solid-svg-icons'

function DropMethodCard(props) {

    function dropCard(e){
        let parentId = e.currentTarget.parentElement.id;
        console.log(parentId)
        $( "#" + parentId ).toggleClass('dropped');
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
                                <FontAwesomeIcon className="icon" icon={faChartPie} />  
                                <p>analysis</p>
                                <p>{props.method.Type_analyse}</p>
                            </div>
                        </div>
                        <p>{props.method.Exemple}</p>
                    </div>
                    <div className="ressources">
                        <div className="ressource">
                            <FontAwesomeIcon className="icon" icon={faFilePdf} /> 
                            <p>user.pdf</p> 
                        </div>
                    </div>
                </div>
                <div onClick={(e) => dropCard(e)} className="deploy">
                    <FontAwesomeIcon icon={faSortDown} />  
                </div>
            </div>
        </div>
    );
}

export default DropMethodCard;
