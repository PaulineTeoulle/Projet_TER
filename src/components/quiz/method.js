import React, {useEffect, useState} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChartPie, faClipboard, faFilePdf, faFolderOpen, faUsers} from '@fortawesome/free-solid-svg-icons'

function Method(props) {
    const [checked, setChecked] = useState(false);

    function finish() {
        props.changeData(0);
    }

    function resume() {
        props.resumeQuiz();
    }

    function toggleValue(){
        setChecked(!checked);
    }

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
                    <div className="ressources">
                        <div className="ressource">
                            <FontAwesomeIcon className="icon" icon={faFilePdf}/>
                            <p>user.pdf</p>
                        </div>
                    </div>
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
                <button className="button outlined" onClick={finish}>finish</button>
                <button className="button filled" onClick={resume}>continue</button>
            </div>
        </div>
    );
}

export default Method;
