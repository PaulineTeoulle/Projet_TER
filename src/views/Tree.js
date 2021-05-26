import React, {useRef, useState, useEffect} from 'react';
import $, { get } from 'jquery';
import axios from 'axios';
import ReactFlow, {addEdge, ReactFlowProvider, removeElements} from 'react-flow-renderer';

import Loader from '../components/Loader';
import Toolbar from '../components/Toolbar';
import CustomNode from '../components/tree/CustomNode';
import DebugNode from '../components/tree/DebugNode';

import ModalEditCritere from '../components/modal/tree/ModalEditCritere';
import ModalEditEdge from '../components/modal/tree/ModalEditEdge';

function Tree() {
    const nodeTypes = {
        critereNode: CustomNode,
        debugNode: DebugNode
    };

    const colors = ['black', 'marron', 'blue', 'red', 'purple', 'fushia', 'green', 'lime', 'yellow',
'navy', 'aqua', 'aquamarine', 'chocolate', 'coral', 'crimson', 'darkcyan', 'darkgreen', 'darkorange', 'darkseagreen',
'deeppink', 'gold', 'indgo', 'lightcoral'];

    const [initialTree, setInitialTree] = useState(null);
    const [nextId, setNextId] = useState("1");
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
        switch (element.type) {
            case 'critereNode':
                openModalEditCritere(element);
                console.log("open critere modal")
                break;
            case 'default':
                console.log("open methode modal")
                break;
            case 'smoothstep':
                openModalEditEdge(element);
                console.log("open edge modal")
                break;
            case 'input':
                alert("Cannot modify start node")
                break;
            case 'output':
                alert("Cannot modify end node")
                break;
        }
    }

    const onPaneClick = (event) => {
        event.preventDefault();
        // closeEdition();
    }


    // FUNCTIONS

    // return les prochains ID utilisable
    function getId() {
        return nextId;
    }

    function getEdgeId() {
        return nextEdgeId;
    }

    function getMethodId() {
        return nextMethodId;
    }

    /*
    crée un noeud de type :
        - input
        - output
        - default (method)
        - critereNode (critere)
    */
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
    
    // crée un lien entre 2 noeuds
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

    // function createDebugNode() {
    //     let debugNode = {
    //         id: "666",
    //         type: "debugNode",
    //         position: {
    //             x: 0,
    //             y: 0
    //         }
    //     };
    //     setElements((es) => es.concat(debugNode));
    // }

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

    // initialise le noeud de debut et le premier critere pour commencer
    function initTree(){
        createNode('0', 'input', {x: 0, y: 0});
        let firstNode = initialTree.criteres.find(el => el.ID_Critere === initialTree.entree[0].ID_Critere);
        createNode(firstNode.ID_Critere,'critereNode', {x: 0, y: 100}, firstNode.Libelle);
        createEdge('D0' ,'0', firstNode.ID_Critere, null);
        initNodes(initialTree.entree[0].ID_Critere);
    }

    // initilialise critère, méthodes et décisiosn depuis le premier critère
    function initNodes(start){
        initialTree.criteres.forEach(node => {
            let color = colors[0]
            colors.splice(0, 1);
            if(node.ID_Critere !== start){
                createNode(node.ID_Critere, 'critereNode',  {x: parseInt(node.x), y: parseInt(node.y)}, node.Libelle)
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

    // retourne les décisions d'un noeud
    function getDecisions(nodeId){
        let decisions =  initialTree.decisions.filter(decision => decision.ID_Critere_entrant === nodeId);
        return decisions;
    }

    // retourne la méthode d'un décision si elle existe
    function getMethod(decision){
        let method =  initialTree.methodes.find(method => method.ID_Decision === decision.ID_Decision);
        return method;
    }

    // récupère l'arbre a l'initialisation du composant
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

    // quand l'arbre et chargé et si il possède une entree on lance la création de l'arbre visuel
    useEffect(() => {
        if(initialTree && initialTree.entree.length){
            initTree();
        }
    }, [initialTree]);

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
            Informations: (element.data.informations ? element.data.informations : null),
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

    // MODAL MANAGEMENT

    // edit critères

    const [modalEditCritereOpen, setModalEditCritereOpen] = useState(false);
    const [selectedCritere, setSelectedCritere] = useState(null);

    function openModalEditCritere(element) {
        let critere = elements.find(el => el.id === element.id);
        setSelectedCritere(critere);
        setModalEditCritereOpen(true);
    }

    function closeModalEditCritere(){
        setModalEditCritereOpen(false);
    }

    function saveCritere(label, informations){
        // change le label dans l'instance react flow
        selectedCritere.data.label = label;
        if(informations){selectedCritere.data.informations = informations;}

        // force le rendu du noeud
        // l'instance ne se rerender pas si modification dans sous object donc on change position
        selectedCritere.position = {x: selectedCritere.position.x, y: selectedCritere.position.y + 1}
        rerenderFlow();
    }

    // edit edges
    const [modalEditEdgeOpen, setModalEditEdgeOpen] = useState(false);
    const [selectedEdge, setSelectedEdge] = useState(null);

    function openModalEditEdge(element) {
        let edge = elements.find(el => el.id === element.id);
        setSelectedEdge(edge);
        setModalEditEdgeOpen(true);
    }

    function closeModalEditEdge(){
        setModalEditEdgeOpen(false);
    }

    function saveEdge(label){
        selectedEdge.label = label;
        rerenderFlow();
    }

    // FORCE RERENDER

    function rerenderFlow(){
        let cloneElements = [...elements];
        setElements(cloneElements);     
    }

    return (
        <div className="Tree">
            {elements ?
                <ReactFlowProvider>
                    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                        <Toolbar className="tools"/>
                        <div className="canvas">
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
                    </div>
                    <button onClick={() => printNodes()}>print nodes</button>

                    <ModalEditCritere
                        title="Edit critere"
                        open={modalEditCritereOpen}  
                        close={closeModalEditCritere}
                        mainAction={saveCritere}
                        selectedCritere={selectedCritere}
                    />

                    <ModalEditEdge
                        title="Edit Edge"
                        open={modalEditEdgeOpen}  
                        close={closeModalEditEdge}
                        mainAction={saveEdge}
                        selectedEdge={selectedEdge}
                    />
                </ReactFlowProvider>
            : <Loader/> 
            }
        </div>
    );
}

export default Tree;
