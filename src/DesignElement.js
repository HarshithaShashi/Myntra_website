import React from 'react';
import { useDrag } from 'react-dnd';

function DesignElement({ design, setDesigns }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'designItem',
    item: { id: design.id, type: design.type, src: design.src },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      if (!offset) return; // Handle the case where offset is null

      setDesigns((prevDesigns) =>
        prevDesigns.map((d) =>
          d.id === item.id ? { ...d, left: offset.x, top: offset.y } : d
        )
      );
    },
  }));

  const handleDoubleClick = () => {
    setDesigns((prevDesigns) => prevDesigns.filter((d) => d.id !== design.id));
  };

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        left: design.left,
        top: design.top,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
      onDoubleClick={handleDoubleClick}
    >
      <img src={design.src} alt={design.type} style={{ width: '120px', height: '120px' }} />
    </div>
  );
}

export default DesignElement;
