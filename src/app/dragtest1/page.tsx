import React from 'react';
import { DndProvider, useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = 'ITEM';

interface DragItem {
  index: number;
}

interface DraggableItemProps {
  item: string;
  index: number;
  moveItem: (fromIndex: number, toIndex: number) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item, index, moveItem }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem: DragItem, monitor: DropTargetMonitor) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => {
        if (node) {
          drop(node);
          ref(node);
        }
      }}
      style={{ padding: '8px', margin: '4px', border: '1px solid #000', cursor: 'move' }}
    >
      {item}
    </div>
  );
};

const DragDropList: React.FC = () => {
  const [items, setItems] = React.useState<string[]>(['Item 1', 'Item 2', 'Item 3', 'Item 4']);

  const moveItem = (fromIndex: number, toIndex: number) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {items.map((item, index) => (
        <DraggableItem key={index} index={index} item={item} moveItem={moveItem} />
      ))}
    </DndProvider>
  );
};

export default DragDropList;
