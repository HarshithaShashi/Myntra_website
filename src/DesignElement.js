import React from 'react';
import { useDrag } from 'react-dnd';

function DesignElement({ design }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'designItem',
    item: { id: design.id, type: design.type, src: design.src },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        left: design.left,
        top: design.top,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <img src={design.src} alt={design.type} style={{ width: '50px', height: '50px' }} />
    </div>
  );
}

export default DesignElement;