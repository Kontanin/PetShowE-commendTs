'use client'
import React, { useState } from 'react';

const DragDrop: React.FC = () => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [items, setItems] = useState<string[]>(['Item 1', 'Item 2', 'Item 3', 'Item 4']);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, item: string) => {
    setDraggedItem(item);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();
    if (draggedItem !== null) {
      const newItems = [...items];
      newItems.splice(index, 0, newItems.splice(newItems.indexOf(draggedItem), 1)[0]);
      setItems(newItems);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          draggable
          onDragStart={(event) => handleDragStart(event, item)}
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, index)}
          style={{ padding: '8px', margin: '4px', border: '1px solid #000', cursor: 'move' }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default DragDrop;

