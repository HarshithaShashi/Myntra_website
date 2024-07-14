import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import DesignElement from './DesignElement';

function DesignArea({ designs, setDesigns }) {
  const dropRef = useRef(null);

  const [, drop] = useDrop({
    accept: 'designItem',
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      if (!offset || !dropRef.current) return; // Handle the case where offset or dropRef.current is null

      const boundingRect = dropRef.current.getBoundingClientRect();

      setDesigns((prevDesigns) => {
        const existingDesignIndex = prevDesigns.findIndex(design => design.id === item.id);
        if (existingDesignIndex !== -1) {
          const updatedDesigns = [...prevDesigns];
          updatedDesigns[existingDesignIndex] = {
            ...updatedDesigns[existingDesignIndex],
            left: offset.x - boundingRect.left,
            top: offset.y - boundingRect.top,
          };
          return updatedDesigns;
        } else {
          if (prevDesigns.length < 6) {
            return [
              ...prevDesigns,
              {
                ...item,
                left: offset.x - boundingRect.left,
                top: offset.y - boundingRect.top,
                id: Date.now(),
              },
            ];
          } else {
            alert('You can only add up to 6 designs.');
            return prevDesigns;
          }
        }
      });
    },
  });

  const combinedRef = (node) => {
    drop(node);
    dropRef.current = node;
  };

  return (
    <div ref={combinedRef} className="design-area">
      {designs.map((design) => (
        <DesignElement key={design.id} design={design} setDesigns={setDesigns} />
      ))}
    </div>
  );
}

export default DesignArea;
