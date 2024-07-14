import React from 'react';
import { useDrag } from 'react-dnd';

function DesignItem({ item, addDesign }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'designItem',
    item: { type: item.type, src: item.src },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="design-item"
      style={{ opacity: isDragging ? 0.2 : 1 }}
      onClick={() => addDesign(item)}
    >
      <img src={item.src} alt={item.type} style={{ width: '80px', height: '80px' }} />
    </div>
  );
}

export default DesignItem;