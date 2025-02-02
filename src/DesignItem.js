import React from 'react';
import { useDrag } from 'react-dnd';

function DesignItem({ item, addDesign }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'designItem',
    item: { id: Date.now(), type: item.type, src: item.src }, // Ensure each item has a unique id
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="design-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={() => addDesign(item)}
    >
      <img src={item.src} alt={item.type} style={{ width: '110px', height: '110px' }} />
    </div>
  );
}

export default DesignItem;
