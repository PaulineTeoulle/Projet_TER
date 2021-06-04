import React, {useRef, useState, useEffect} from 'react';
import $, { get } from 'jquery';
import axios from 'axios';
import ReactFlow, {addEdge, ReactFlowProvider, removeElements} from 'react-flow-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import Loader from '../components/Loader';
import Toolbar from '../components/Toolbar';
import CustomNode from '../components/tree/CustomNode';
import DebugNode from '../components/tree/DebugNode';

import ModalEditCritere from '../components/modal/tree/ModalEditCritere';
import ModalEditEdge from '../components/modal/tree/ModalEditEdge';
import ModalEditMethod from '../components/modal/tree/ModalEditMethod';
import ModalEditEndNode from '../components/modal/tree/ModalEditEndNode';
import ModalWarning from '../components/modal/ModalWarning';

function Tree() {
    const nodeTypes = {
        critereNode: CustomNode,
        debugNode: DebugNode
    };

    const colors = ['black', 'marron', 'blue', 'red', 'purple', 'fushia', 'green', 'lime', 'yellow',
'navy', 'aqua', 'aquamarine', 'chocolate', 'coral', 'crimson', 'darkcyan', 'darkgreen', 'darkorange', 'darkseagreen',
'deeppink', 'gold', 'indgo', 'lightcoral'];

    const [initialTree, setInitialTree] = useState(null);
    const [resources, setResources] = useState(null);
    const [nextId, setNextId] = useState("1");
    const [nextEdgeId, setNextEdgeId] = useState("D1");
    const [nextMethodId, setNextMethodId] = useState("M1");
    const [elements, setElements] = useState([]);
    const [remove, setRemove] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);

    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
    const onConnect = (params) => setElements((els) => addEdge({
        ...params,
        id: getEdgeId(), arrowHeadType: 'arrowclosed', label: '', type: 'smoothstep',
    }, els, setNextEdgeId("D" + (parseInt(nextEdgeId.slice(1)) + 1).toString())));

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
        let toolbarWidth = $('aside').width();
        const position = reactFlowInstance.project({
            x: event.clientX - toolbarWidth,
            y: event.clientY - reactFlowBounds.top,
        });
        createNode(type, position);
    };

    const onElementClick = (event, element) => {
        if(!remove){
            switch (element.type) {
                case 'critereNode':
                    openModalEditCritere(element);
                    break;
                case 'default':
                    openModalEditMethod(element);
                    break;
                case 'smoothstep':
                    openModalEditEdge(element);
                    break;
                case 'input':
                    alert("Cannot modify start node")
                    break;
                case 'output':
                    openModalEditEndNode(element);
                    break;
            }
        } else {
            if(element.type != "smoothstep"){
                let edges = elements.filter(item => item.type === "smoothstep");
                let attachedEdges = edges.filter(item => item.source === element.id || item.target === element.id );
                if(attachedEdges.length > 0){
                    alert("You must remove all edges from this element")
                } else {
                    deleteElement(element); 
                }
            } else {
                deleteElement(element); 
            }
        }
    }

    const onPaneClick = (event) => {
        event.preventDefault();
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

    parametres :
        - type : type du noeud
        - position : position du client si noeud créer via toolbar ou position x et y stocké en bd
        - data : toutes les data du noeud de la BD, si noeud créer via toolbar le label et générer par défault
    */
    function createNode(type, position, data) {
        let newNode;
        switch (type) {
            case 'input':
                // noeud entree
                newNode = {
                    id: "0",
                    type,
                    position,
                    data: {label: `${type} node`},
                };
                break;
            case 'output':
                // noeud sortie
                newNode = {
                    id: "S0",
                    type,
                    position,
                    data: {
                        label: `${type} node`,
                        message: (data ? data.Message : null)
                    },
                };
                break;
            case 'critereNode':
                // noeud critere
                if(data){
                    newNode = {
                        id: data.ID_Critere,
                        type,
                        position,
                        data: {
                            label: data.Libelle,
                            informations: (data.Informations ? data.Informations : null)
                        },
                    };
                    if(data.ID_Critere > getId()){
                        setNextId((parseInt(data.ID_Critere) + 1).toString());
                    }      
                } else {
                    newNode = {
                        id: getId(),
                        type,
                        position,
                        data: {label: "default critere label"},
                    };
                    setNextId((parseInt(nextId) + 1).toString());
                }
                break;
            case 'default':
                // noeud methode
                if(data){
                    newNode = {
                        id: "M" + data.ID_Methode,
                        type,
                        position,
                        data: {
                            label: data.Libelle,
                            description: data.Description,
                            productedData: data.Donnees_produites,
                            workforce: data.Effectif_preconise,
                            method: data.Type_methode,
                            analysis: data.Type_analyse,
                            exemple: data.Exemple
                        },
                    };
                    if(parseInt(data.ID_Methode) >= getMethodId().slice(1)){
                        setNextMethodId("M" + (parseInt(data.ID_Methode) + 1).toString());
                    }               
                } else {
                    newNode = {
                        id: getMethodId(),
                        type,
                        position,
                        data: {label: "default method label"},
                    };
                    setNextMethodId("M" + (parseInt(getMethodId().slice(1)) + 1).toString());
                }
                break;
        }
        // insertion du noeud dans les elements react flow render
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
        // if(id.substring(0, 2) != "DM"){
        //     if(parseInt(id.slice(1)) >= getEdgeId().slice(1)){
        //         console.log(nextEdgeId)
        //         setNextEdgeId("D" + (parseInt(id.slice(1)) + 1).toString());
        //     }
        // }    
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

    // gestion de la supression
    function deleteMode(){
        remove ? setRemove(false) : setRemove(true);
    }

    function deleteElement(element){
            let selectedElement = elements.find(el => el.id === element.id);
            let index = elements.indexOf(selectedElement);
            setElements(elements.filter(item => elements.indexOf(item) !== index))
    }

    useEffect(() => {
        if(remove){
            $(".canvas").addClass( "removeMode" );
            $(".removeModeMessage").css("opacity", "1");
        } else {
            $(".canvas").removeClass( "removeMode" );
            $(".removeModeMessage").css("opacity", "0");
        }
    },[remove]);

    // INIT TREE

    // initialise le noeud de debut et le premier critere pour commencer
    function initTree(){
        let startNode = initialTree.entree[0];
        createNode('input', {x: parseInt(startNode.x), y: parseInt(startNode.y)});
        let firstNode = initialTree.criteres.find(el => el.ID_Critere === initialTree.entree[0].ID_Critere);
        //console.log(firstNode);
        createNode('critereNode', {x: parseInt(firstNode.x), y: parseInt(firstNode.y)}, firstNode);
        createEdge('D0' ,'0', firstNode.ID_Critere, null);

        let endNode = initialTree.sortie[0];
        createNode('output',  {x: parseInt(endNode.x), y: parseInt(endNode.y)}, endNode);

        initNodes(initialTree.entree[0].ID_Critere);
    }

    // initilialise critère, méthodes et décisiosn depuis le premier critère
    function initNodes(start){
        initialTree.criteres.forEach(node => {
            let color = colors[0]
            colors.splice(0, 1);
            if(node.ID_Critere !== start){
                createNode('critereNode',  {x: parseInt(node.x), y: parseInt(node.y)}, node)
            }
            // on récupère les décisions attaché au critère et on regarde si un méthode est attaché
            let decisions = getDecisions(node.ID_Critere);
            decisions.forEach(decision => {
                let method = getMethod(decision);
                if(method){
                    createNode('default',  {x: parseInt(method.x), y: parseInt(method.y)}, method);
                    createEdge("D" + decision.ID_Decision ,node.ID_Critere, "M" + method.ID_Methode, decision.Libelle, color);
                    createEdge("DM" + decision.ID_Decision, "M" + method.ID_Methode, decision.ID_Critere_sortant, null, color);
                } else {
                    if(decision.ID_Critere_sortant){
                        createEdge("D" + decision.ID_Decision, decision.ID_Critere_entrant, decision.ID_Critere_sortant, decision.Libelle, color);
                    } else {
                        createEdge("D" + decision.ID_Decision, decision.ID_Critere_entrant, "S0", decision.Libelle, color);
                    }
                }
            })                
        });
    }

    function initEdgesId(){
        let highest = 0;
        initialTree.decisions.forEach(decision => {
            if(decision.ID_Decision > highest){
                highest = decision.ID_Decision;
            }
        })
        setNextEdgeId("D" + (parseInt(highest) + 1).toString());
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

    function initResources(){
        let resources = [];
        initialTree.methodesRessources.forEach(element => {
            let resource = initialTree.ressources.filter(item => item.ID_Ressource === element.ID_Ressource);
            let method = initialTree.methodes.find(item => item.ID_Methode === element.ID_Methode);
            resources[method.ID_Methode] ? resources[method.ID_Methode].push(resource[0]): resources[method.ID_Methode] = [resource[0]]; 
        })
        setResources(resources);
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
            initResources();
            initEdgesId();
        }
    }, [initialTree]);

    // RECONSTRUCTION DE L'ARBRE

    const [modalWarningOpen, setModalWarningOpen] = useState(false);

    function closeModalWarning(){
        setErrorMessage(null);
        setModalWarningOpen(false);
    }

    useEffect(() => {
        if(errorMessage){
            setModalWarningOpen(true);
        }
    }, [errorMessage]);

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
            criteres: [],
            methodes: [],
            decisions: [],
            entree: [],
            sortie: [],
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
                    transformedElement = transformToSortie(element);
                    finalTree.sortie.push(transformedElement)
                    break;
            }
        })
        
        // on regarde si il y'a des erreurs dans l'arbre (cas inaproprié)
        let error = checkTree(finalTree);
        if(!error){
            console.log(finalTree);
            let protocol = window.location.protocol;
            let host = window.location.hostname;
            let url = protocol + '//' + host;
                axios.post(url + '/reactTest/MATUI/API/Controllers/creerArbre.php', finalTree)
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => console.log(error))
        }
    }

    /*
        Fonctions de transformation de l'arbre final
    */
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
            ID_Decision: (decision ? decision.id.slice(1) : null),
            Libelle: element.data.label,
            Description: element.data.description,
            Donnees_produites: element.data.productedData,
            Effectif_preconise: element.data.workforce,
            Exemple: element.data.exemple,
            Type_analyse: element.data.analysis,
            Type_methode: element.data.method,
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
        let startNode = {
            ID_Entree: element.id,
            ID_Critere: (outDecision ? outDecision.target : null),
            x: element.position.x,
            y: element.position.y
        }
        return startNode;
    }

    function transformToSortie(element){
        let endNode = {
            ID_Sortie: element.id.slice(1),
            message: element.data.message,
            x: element.position.x,
            y: element.position.y
        }
        return endNode;
    }

    /*
    l'abre doit :
        - posséder un noeud entree et sortie
        - ne pas posséder d'élements flottant (non relié ou partiellement relié)
        - ne pas posséder d'élements non labellisé excepté les noeud d'entree, sortie,
            liens sortant des méthodes et le lien source du noeud d'entree
    */
    function checkTree(finalTree){
        let error = false;
        // vérifie si il y'a bien un noeud d'entrée et de sortie
        if(finalTree.entree.length != 1){
            setErrorMessage("Tree must have start node");
            error = true;
        } else if (finalTree.sortie.length != 1){
            setErrorMessage("Tree must have end node");
            error = true;
        } else if (!finalTree.criteres.length){
            setErrorMessage("Tree must have node");
            error = true;
        } 

        // si c'est le cas on vérifie si il n'y a pas de noeud flottant
        if(!error){
            let floatingNode = checkFloatingNode(finalTree);
            let floatingMethod = checkFloatingMethod(finalTree);
            if(floatingNode || floatingMethod){
                error = true;
            }
        }
        
        return error;
    }

    // vérifie si il y'a un noeud flottant
    function checkFloatingNode(finalTree){
        let condition = true;

        // pour chaque critère on regarde les décisions entrante et sortante
        finalTree.criteres.forEach(critere => {
            let outputEdge = null;
            let inputEdge = null;
            outputEdge = finalTree.decisions.filter(decision => decision.ID_Critere_entrant === critere.ID_Critere);
            inputEdge = finalTree.decisions.filter(decision => decision.ID_Critere_sortant === critere.ID_Critere);

            // on gère le cas ou c'est la décision suivant le noeud d'entrée
            if(!inputEdge.length){
                if(finalTree.entree[0].ID_Critere === critere.ID_Critere){
                    inputEdge.push(finalTree.entree[0]);
                }
            }

            // si il n'ya pas de noeud sortant ou entrant la condition n'est pas respecté
            if(!inputEdge.length || !outputEdge.length){
                condition = false;
            }

            // si le noeud sortant contient un "M" ca veut dire qu'il manque un lien après la méthode
            // la condition n'est pas respecté
            outputEdge.forEach(element =>{
                if(element.ID_Critere_sortant.charAt(0) === "M"){
                    condition = false;
                }
            })
        })
        // si la condition n'est pas respecté on set un message d'erreur
        if(!condition){
            setErrorMessage("There is a floating node somewhere, check that each edge has a label (except output edge from the start node and methods) and that each critere is connected");
            return true;
        } else {
            return false;
        }
    }

    // vérifie si il y'a une méthode flottante
    function checkFloatingMethod(finalTree){
        let condition = true;

        finalTree.methodes.forEach(element => {
            if(!element.ID_Decision){
                condition = false;
            } else {
                let decision = finalTree.decisions.find(item => item.ID_Decision === element.ID_Decision);
                if(!decision){
                    condition = false;
                }
            }
        })

        switch(condition){
            case true:
                return false;
            case false:
                setErrorMessage("There is a floating method somewhere")
                return true;
        }
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
        // change les data dans l'instance react flow
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

    // edit method

    const [modalEditMethodOpen, setModalEditMethodOpen] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(null);

    function openModalEditMethod(element) {
        let method = elements.find(el => el.id === element.id);
        setSelectedMethod(method);
        setModalEditMethodOpen(true);
    }

    function closeModalEditMethod(){
        setModalEditMethodOpen(false);
    }

    function saveMethod(newData){
        // change les data dans l'instance react flow
        selectedMethod.data.label = newData.label;
        selectedMethod.data.description = newData.description;
        selectedMethod.data.productedData = newData.productedData;
        selectedMethod.data.workforce = newData.workforce;
        selectedMethod.data.method = newData.method;
        selectedMethod.data.analysis = newData.analysis;
        selectedMethod.data.exemple = newData.exemple;

        // force le rendu du noeud
        // l'instance ne se rerender pas si modification dans sous object donc on change position
        selectedMethod.position = {x: selectedMethod.position.x, y: selectedMethod.position.y + 1}
        rerenderFlow();
    }

    // edit noeud de fin

    const [modalEditEndNodeOpen, setModalEditEndNodeOpen] = useState(false);
    const [selectedEndNode, setSelectedEndNode] = useState(null);

    function openModalEditEndNode(element) {
        let endNode = elements.find(el => el.id === element.id);
        setSelectedEndNode(endNode);
        setModalEditEndNodeOpen(true);
    }

    function closeModalEditEndNode(){
        setModalEditEndNodeOpen(false);
    }

    function saveEndNode(message){
        // change les data dans l'instance react flow
        selectedEndNode.data.message = message;

        // force le rendu du noeud
        // l'instance ne se rerender pas si modification dans sous object donc on change position
        selectedEndNode.position = {x: selectedEndNode.position.x, y: selectedEndNode.position.y + 1}
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
                        <Toolbar className="tools"
                            save={printNodes}
                        />
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
                        <FontAwesomeIcon onClick={() => deleteMode()} className="icon delete" icon={faTrashAlt} />
                        <p className="removeModeMessage">Warning, you activated the suppression mode</p>
                    </div>
                    <button onClick={() => console.log(elements)}>debug</button>

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

                    <ModalEditMethod
                        title="Edit Method"
                        open={modalEditMethodOpen}  
                        close={closeModalEditMethod}
                        mainAction={saveMethod}
                        selectedMethod={selectedMethod}
                        resources={resources}
                    />

                    <ModalEditEndNode
                        title="Edit End node"
                        open={modalEditEndNodeOpen}  
                        close={closeModalEditEndNode}
                        mainAction={saveEndNode}
                        selectedEndNode={selectedEndNode}
                    />

                    <ModalWarning
                        message={errorMessage}
                        open={modalWarningOpen}  
                        close={closeModalWarning}
                    />
                </ReactFlowProvider>
            : <Loader/> 
            }
        </div>
    );
}

export default Tree;
