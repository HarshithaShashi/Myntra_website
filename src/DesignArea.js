import React from 'react';
import { useDrop } from 'react-dnd';
import DesignElement from './DesignElement';

function DesignArea({ designs, setDesigns }) {
  const [, drop] = useDrop(() => ({
    accept: 'designItem',
    drop: (item, monitor) => {
      if (designs.length < 6) { // Ensure no more than 6 designs
        const offset = monitor.getClientOffset();
        const newDesign = { ...item, left: offset.x, top: offset.y, id: Date.now() };
        setDesigns((prevDesigns) => [...prevDesigns, newDesign]);
      } else {
        alert('You can only add up to 6 designs.');
      }
    },
  }));

  return (
    <div ref={drop} className="design-area">
      <p className="design-header">Create Your Fit</p>
      {designs.map((design) => (
        <DesignElement key={design.id} design={design} />
      ))}
    </div>
  );
}

export default DesignArea;