import React, {useRef, useState} from 'react';
import $ from 'jquery';
import ReactFlow, {addEdge, ReactFlowProvider, removeElements} from 'react-flow-renderer';

import Toolbar from '../components/Toolbar';

function Tree() {

    const initialElements = [
        {
            id: '1',
            type: 'input',
            data: {label: 'Start Node'},
            position: {x: 250, y: 25},
        },
        {
            id: '2',
            type: 'default',
            data: {label: 'Node'},
            position: {x: 100, y: 125},
        },
        {
            id: '3',
            type: 'output',
            data: {label: 'End Node'},
            position: {x: 250, y: 250},
        },
        {
            id: 'e1-2',
            source: '1',
            target: '2',
            type: 'smoothstep',
            arrowHeadType: 'arrowclosed',
            label: 'edge label',
        },
        {
            id: 'e2-3',
            source: '2',
            target: '3',
            type: 'smoothstep',
            arrowHeadType: 'arrowclosed',
            label: 'edge label',
        },
    ];

    const [nextId, setNextId] = useState("0");
    const [editedElement, setEditedElement] = useState(null);
    const [elements, setElements] = useState(initialElements);
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
    const onConnect = (params) => setElements((els) => addEdge({
        ...params,
        arrowHeadType: 'arrowclosed', label: 'edge label', type: 'smoothstep'
    }, els));
    const onLoad = (_reactFlowInstance) => setReactFlowInstance(_reactFlowInstance);


    // HOOKS REACT-FLOW

    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (event) => {
        event.preventDefault();

        //check if input/output already exists
        const type = event.dataTransfer.getData('application/reactflow');
        if (type == "input" || type == "output") {
            if (checkExist(type)) {
                return alert("Désolé, il ne peut y avoir qu'un seul noeud de type " + type)
            }
        }

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        createNode(type, position);
        setNextId((parseInt(nextId) + 1).toString());
    };

    const onElementClick = (event, element) => {
        // event.preventDefault();
        let el = $("div").find(`[data-id='${element.id}']`)
        if (el.text() === "Start Node" || el.text() === "End Node") {
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

    // set next ID
    (function setId() {
        $(".react-flow__node").each(function (index) {
            let currentId = $(this).data("id");
            if (currentId >= nextId) {
                setNextId((currentId + 1).toString());
            }
        });
    })();

    function getId() {
        return nextId;
    }

    // add input in selected node
    function openEdition(element) {
        if (!editedElement) {
            let el = $("div").find(`[data-id='${element.id}']`)
            let text = el.text()
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

    function createNode(type, position) {
        let newNode = {
            id: getId(),
            type,
            position,
            data: {label: `${type} node`},
        };
        setElements((es) => es.concat(newNode));
    }

    // check if a node type already exists
    function checkExist(type) {
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].type == type) {
                return true;
            }
        }
        return false;
    }

    // DEBUG

    function printNodes() {
        console.log(elements);
    }

    return (
        <div className="Tree">
            <ReactFlowProvider>
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <h1>Tree</h1>
                    <div style={{height: 600, backgroundColor: 'lightgrey'}}>
                        <ReactFlow elements={elements}
                                   onElementsRemove={onElementsRemove}
                                   onConnect={onConnect}
                                   deleteKeyCode={46}
                                   onLoad={onLoad}
                                   onDrop={onDrop}
                                   onDragOver={onDragOver}
                                   onElementClick={onElementClick}
                                   onPaneClick={onPaneClick}/>
                    </div>
                    <button onClick={() => printNodes()}>print nodes</button>
                    <Toolbar/>
                </div>
            </ReactFlowProvider>
        </div>
    );
}

export default Tree;
