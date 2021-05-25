import React, {useRef, useState, useEffect} from 'react';
import $, { get } from 'jquery';
import axios from 'axios';
import ReactFlow, {addEdge, ReactFlowProvider, removeElements} from 'react-flow-renderer';

import Loader from '../components/Loader';
import Toolbar from '../components/Toolbar';
import CustomNode from '../components/tree/CustomNode';

function Tree() {
    const nodeTypes = {
        critereNode: CustomNode,
    };

    const colors = ['black', 'marron', 'blue', 'red', 'purple', 'fushia', 'green', 'lime', 'yellow',
'navy', 'aqua', 'aquamarine', 'chocolate', 'coral', 'crimson', 'darkcyan', 'darkgreen', 'darkorange', 'darkseagreen',
'deeppink', 'gold', 'indgo', 'lightcoral'];

    const [initialTree, setInitialTree] = useState(null);
    const [nextId, setNextId] = useState("0");
    const [nextEdgeId, setNextEdgeId] = useState("D1");
    const [nextMethodId, setNextMethodId] = useState("M1");

    const [editedElement, setEditedElement] = useState(null);
    const [elements, setElements] = useState([]);

    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
    const onConnect = (params) => setElements((els) => addEdge({
        ...params,
        id: getEdgeId(), arrowHeadType: 'arrowclosed', label: 'edge label', type: 'smoothstep',
    }, els, setNextEdgeId("D" + (parseInt(nextEdgeId.slice(1)) + 1).toString())));
    // const onLoad = (_reactFlowInstance) => setReactFlowInstance(_reactFlowInstance);
    // const [reactFlowInstance, setReactFlowInstance] = useState(null);



    // HOOKS REACT-FLOW

    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (event) => {
        event.preventDefault();

        //check if input/output already exists
        const type = event.dataTransfer.getData('application/reactflow');
        if (type!= null && type == "input" || type == "output") {
            if (checkExist(type)) {
                return alert("Désolé, il ne peut y avoir qu'un seul noeud de type " + type)
            }
        }

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        createNode(getId(), type, position);
        // if(type === 'default' || type === 'critereNode'){
        //     setNextId((parseInt(nextId) + 1).toString());
        // }
    };

    const onElementClick = (event, element) => {
        // event.preventDefault();
        // let el = $("div").find(`[data-id='${element.id}']`)
        if (element.type === "input" || element.type === "output") {
            console.log("Impossible de modifier le noeud (début ou fin)")
        } else {
            openEdition(element);
        }
    }

    const onPaneClick = (event) => {
        event.preventDefault();
        closeEdition();
    }


    // FUNCTIONS

    function getId() {
        return nextId;
    }

    function getEdgeId() {
        return nextEdgeId;
    }

    function getMethodId() {
        return nextMethodId;
    }

    // add input in selected node
    function openEdition(element) {
        if (!editedElement) {
            let el = $("div").find(`[data-id='${element.id}']`);
            console.log(el);
            let text = el.text();
            el.css("font-size", 0);
            el.append(`<input type="text" id="label" name="label" value="${text}"/>`);
            setEditedElement(el)
        }
    }

    // remove input in selected node and save label
    function closeEdition() {
        if (editedElement) {
            let newValue = editedElement.children("input").val();
            elements.forEach(element => {
                if (element.id == editedElement.data("id")) {
                    element.data.label = newValue;
                }
            });
            editedElement.children("input").remove();
            editedElement.css("font-size", "12px");
            setEditedElement(null)
        }
    }

    function createNode(id, type, position, label) {
        let newNode;
        switch (type) {
            case 'input':
                newNode = {
                    id: "0",
                    type,
                    position,
                    data: {label: label},
                };
                break;
            case 'output':
                newNode = {
                    id: "S0",
                    type,
                    position,
                    data: {label: label},
                };
                break;
            case 'critereNode':
                if(label){
                    newNode = {
                        id: id,
                        type,
                        position,
                        data: {label: label},
                    };
                    if(id > getId()){
                        setNextId((parseInt(id) + 1).toString());
                    }      
                } else {
                    newNode = {
                        id: getId(),
                        type,
                        position,
                        data: {label: `${type} node`},
                    };
                    setNextId((parseInt(nextId) + 1).toString());
                }
                break;
            case 'default':
                if(label){
                    newNode = {
                        id: id,
                        type,
                        position,
                        data: {label: label},
                    };
                    if(parseInt(id.slice(1)) > getMethodId().slice(1)){
                        setNextMethodId("M" + (parseInt(id.slice(1)) + 1).toString());
                    }               
                } else {
                    newNode = {
                        id: getMethodId(),
                        type,
                        position,
                        data: {label: `${type} node`},
                    };
                    setNextMethodId("M" + (parseInt(getMethodId().slice(1)) + 1).toString());
                }
                break;
        }
        setElements((es) => es.concat(newNode));
    }
    

    function createEdge(id, id_source, id_target, label, color){
        let newEdge = {
            id: id,
            source: id_source,
            target: id_target,
            type: 'smoothstep',
            arrowHeadType: 'arrowclosed',
            label: label,
            style: { stroke: color },
        }
        setElements((es) => es.concat(newEdge));
        if(id.substring(0, 2) != "DM"){
            if(parseInt(id.slice(1)) > getEdgeId().slice(1)){
                setNextEdgeId("D" + (parseInt(id.slice(1)) + 1).toString());
            }
        }    
    }

    // check if a node type already exists
    function checkExist(type) {
        if(elements){
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].type == type) {
                    return true;
                }
            }
            return false;
        } else {
            return true;
        }
    }

    // INIT TREE

    function initTree(){
        createNode('0', 'input', {x: 0, y: 0});
        let firstNode = initialTree.criteres.find(el => el.ID_Critere === initialTree.entree[0].ID_Critere);
        createNode(firstNode.ID_Critere,'critereNode', {x: 0, y: 100}, firstNode.Libelle);
        createEdge('D0' ,'0', firstNode.ID_Critere, null);
        initNodes(initialTree.entree[0].ID_Critere);
    }

    function initNodes(start){
        initialTree.criteres.forEach(node => {
            let color = colors[0]
            colors.splice(0, 1);
            if(node.ID_Critere !== start){
                createNode(node.ID_Critere, 'critereNode',  {x: node.x, y: node.y}, node.Libelle)
            }
            // on récupère les décisions attaché au critère et on regarde si un méthode est attaché
            let decisions = getDecisions(node.ID_Critere);
            decisions.forEach(decision => {
                let method = getMethod(decision);
                if(method){
                    createNode("M" + method.ID_Methode, 'default',  {x: method.x, y: method.y}, method.Libelle);
                    createEdge("D" + decision.ID_Decision ,node.ID_Critere, "M" + method.ID_Methode, decision.Libelle, color);
                    createEdge("DM" + decision.ID_Decision, "M" + method.ID_Methode, decision.ID_Critere_sortant, null, color);
                } else {
                    if(decision.ID_Critere_sortant){
                        createEdge("D" + decision.ID_Decision, decision.ID_Critere_entrant, decision.ID_Critere_sortant, decision.Libelle, color);
                    }
                }
            })                
        });
    }

    function getDecisions(nodeId){
        let decisions =  initialTree.decisions.filter(decision => decision.ID_Critere_entrant === nodeId);
        return decisions;
    }

    function getMethod(decision){
        let method =  initialTree.methodes.find(method => method.ID_Decision === decision.ID_Decision);
        return method;
    }

    useEffect(() => {
        if(!initialTree){
            let protocol = window.location.protocol;
            let host = window.location.hostname;
            let url = protocol + '//' + host;
                axios.get(url + '/reactTest/MATUI/API/Controllers/lireArbre.php')
                .then(response => {
                    setInitialTree(response.data)
                })
                .catch(error => console.log(error))
        }
    },[]);

    useEffect(() => {
        if(initialTree){
            initTree();
        }
    }, [initialTree]);

    
    useEffect(() => {
        if(nextMethodId){
            console.log(nextMethodId)
        }
    }, [nextMethodId]);

     // RECONSTRUCTION DE L'ARBRE

    /*
    types :
        - input (start node)
        - output (end node)
        - default (node)
        - smoothstep (edge)
    */
    function printNodes() {
        let flow = reactFlowInstance.toObject();
        let finalTree = {
            entree: [],
            sortie: [],
            criteres: [],
            methodes: [],
            decisions: []
        };
        flow.elements.forEach(element => {
            let transformedElement;
            switch (element.type) {
                case 'critereNode':
                    transformedElement = transformToCritere(element);
                    finalTree.criteres.push(transformedElement)
                    break;
                case 'default':
                    transformedElement = transformToMethod(element, flow);
                    finalTree.methodes.push(transformedElement)
                    break;
                case 'smoothstep':
                    if(element.label){
                        transformedElement = transformToDecision(element, flow);
                        finalTree.decisions.push(transformedElement)
                    }
                        break;
                case 'input':
                    transformedElement = transformToEntree(element,flow);
                    finalTree.entree.push(transformedElement)
                    break;
                case 'output':
                    // transformedElement = transformToSortie(element);
                    finalTree.sortie.push(element)
                    break;
            }
        })
        console.log(initialTree)
        console.log(finalTree);
    }

    function transformToCritere(element){
        let critere = {
            ID_Critere: element.id,
            Libelle: element.data.label,
            x: element.position.x,
            y: element.position.y
        }
        return critere;
    }

    function transformToMethod(element, flow){
        let decision = flow.elements.find(el => el.type === "smoothstep" && el.target === element.id);
        let method = {
            ID_Method: element.id.slice(1),
            ID_Decision: decision.id.slice(1),
            Libelle: element.data.label,
            x: element.position.x,
            y: element.position.y
        }
        return method;
    }

    function transformToDecision(element, flow){
        let outDecision;
        if(element.target.includes("M")){
            outDecision = flow.elements.find(el => el.type === "smoothstep" && el.source === element.target);
        }

        let decision = {
            ID_Decision: element.id.slice(1),
            ID_Critere_entrant: element.source,
            ID_Critere_sortant: (outDecision ? outDecision.target : element.target),
            Libelle: element.label,
        }
        return decision;
    }

    function transformToEntree(element, flow){
        let outDecision = flow.elements.find(el => el.type === "smoothstep" && el.source === element.id);

        let critere = {
            ID_Entree: element.id,
            ID_Critere: outDecision.target,
            x: element.position.x,
            y: element.position.y
        }
        return critere;
    }

    function transformToSortie(element){
        let critere = {
            ID_Critere: element.id,
            x: element.position.x,
            y: element.position.y
        }
        return critere;
    }

    return (
        <div className="Tree">
            {elements ?
                <ReactFlowProvider>
                    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                        <h1>Tree</h1>
                        <div style={{height: 600, backgroundColor: 'lightgrey', margin: '100px'}}>
                            <ReactFlow 
                                elements={elements}
                                nodeTypes={nodeTypes}
                                onElementsRemove={onElementsRemove}
                                onConnect={onConnect}
                                deleteKeyCode={46}
                                onLoad={setReactFlowInstance}
                                onDrop={onDrop}
                                onDragOver={onDragOver}
                                onElementClick={onElementClick}
                                onPaneClick={onPaneClick}/>
                        </div>
                        <button onClick={() => printNodes()}>print nodes</button>
                        <Toolbar/>
                    </div>
                </ReactFlowProvider>
            : <Loader/> 
            }
        </div>
    );
}

export default Tree;
