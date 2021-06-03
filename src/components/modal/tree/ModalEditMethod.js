import React, {useEffect, useState} from "react";
import $ from 'jquery';

function ModalEditMethod(props) {
    const [method, setMethod] = useState(null);
    const [resources, setResources] = useState(null);
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

    return (
        <div className="Modal ModalEditMethod">
            {title &&
            <div>
                <h3>{title}</h3>
                <div>
                    {method &&
                        <form>
                            <input type="text" id="label" name="label" placeholder="label" defaultValue={method.data.label}/>
                            <input type="text" id="description" name="description" placeholder="description" defaultValue={method.data.description}/>
                            <input type="text" id="workforce" name="workforce" placeholder="workforce" defaultValue={method.data.workforce}/>
                            <input type="text" id="productedData" name="productedData" placeholder="productedData" defaultValue={method.data.productedData}/>
                            <input type="text" id="method" name="method" placeholder="method" defaultValue={method.data.method}/>
                            <input type="text" id="analysis" name="analysis" placeholder="analysis" defaultValue={method.data.analysis}/>
                            <input type="text" id="exemple" name="exemple" placeholder="exemple" defaultValue={method.data.exemple}/>
                            <div className="ressources">
                            {resources &&
                                <div>
                                {resources.map((element, i) => {   
                                    return (
                                        <p key={i}>{element.Nom}</p>
                                    ) 
                                })}    
                                </div>
                            }    
                            
                            </div>              
                    </form>
                    }
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
