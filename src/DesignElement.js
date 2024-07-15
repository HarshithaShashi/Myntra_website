import React from 'react';
import { useDrag } from 'react-dnd';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

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

  const handleResize = (e, { size }) => {
    setDesigns((prevDesigns) =>
      prevDesigns.map((d) =>
        d.id === design.id ? { ...d, width: size.width, height: size.height } : d
      )
    );
  };

  return (
    <ResizableBox
      width={design.width || 120}
      height={design.height || 120}
      onResize={handleResize}
      minConstraints={[50, 50]}
      maxConstraints={[500, 500]}
      style={{
        position: 'absolute',
        left: design.left,
        top: design.top,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <div
        ref={drag}
        onDoubleClick={handleDoubleClick}
        style={{ width: '100%', height: '100%' }}
      >
        <img src={design.src} alt={design.type} style={{ width: '100%', height: '100%' }} />
      </div>
    </ResizableBox>
  );
}

export default DesignElement;
