'use client'
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

const DragDropList: React.FC = () => {
  const [items, setItems] = React.useState<string[]>(['Item 1', 'Item 2', 'Item 3', 'Item 4']);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedItems = Array.from(items);
    const [movedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, movedItem);

    setItems(updatedItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item} draggableId={item} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ padding: '8px', margin: '4px', border: '1px solid #000', cursor: 'move', ...provided.draggableProps.style }}
                  >
                    {item}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropList;
