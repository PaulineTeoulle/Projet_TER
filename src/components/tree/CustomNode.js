import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

export default memo(({ data }) => {
  return (
    <>
      <Handle
        type="target"
        position="top"
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
      />
      <div className="critereNode">
        {data.label}
      </div>
      <Handle
        type="source"
        position="bottom"
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
      />
    </>
  );
});