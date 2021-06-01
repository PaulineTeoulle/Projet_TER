import React from 'react';

function Toolbar(props) {
    const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="Toolbar">
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className="dndnode critereNode" onDragStart={(event) => onDragStart(event, 'critereNode')} draggable>
        Default Node
      </div>
      <div className="dndnode default" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Method Node
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>

      <button className="save button filled" onClick={props.save}>Save</button>
    </aside>
  );
};

export default Toolbar;
