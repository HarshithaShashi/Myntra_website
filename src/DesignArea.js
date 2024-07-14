import React from 'react';
import { useDrop } from 'react-dnd';
import DesignElement from './DesignElement';

function DesignArea({ designs, setDesigns }) {
  const [, drop] = useDrop(() => ({
    accept: 'designItem',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const newDesign = { ...item, left: offset.x, top: offset.y };
      setDesigns([...designs, newDesign]);
    },
  }));

  return (
    <div ref={drop} className="design-area">
      <p>Make your outfit</p>
      {designs.map((design) => (
        <DesignElement key={design.id} design={design} />
      ))}
    </div>
  );
}

export default DesignArea;