import React, { memo } from 'react';

// ce noeud sert a forcer le rendu du canvas de render flow #bricolage
export default memo(() => {
  return (
    <>
      <div className="debugNode">
        Debug node
      </div>
    </>
  );
});