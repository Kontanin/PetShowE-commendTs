// src/components/TaskBoard.tsx
'use client';
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

const ItemType = 'TASK';

interface Task {
  id: string;
  content: string;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

interface TaskProps {
  task: Task;
  index: number;
  moveTask: (fromIndex: number, toIndex: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, index, moveTask }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item: DragItem, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveTask(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id: task.id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity,
        padding: '16px',
        margin: '8px 0',
        backgroundColor: '#fff',
        cursor: 'move',
      }}
    >
      {task.content}
    </div>
  );
};

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', content: 'Task 1' },
    { id: '2', content: 'Task 2' },
    { id: '3', content: 'Task 3' },
  ]);

  const moveTask = (fromIndex: number, toIndex: number) => {
    const updatedTasks = update(tasks, {
      $splice: [
        [fromIndex, 1],
        [toIndex, 0, tasks[fromIndex]],
      ],
    });
    setTasks(updatedTasks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{ width: '300px', padding: '16px', backgroundColor: '#eaeaea' }}
      >
        {tasks.map((task, index) => (
          <Task key={task.id} index={index} task={task} moveTask={moveTask} />
        ))}
      </div>
    </DndProvider>
  );
};

export default TaskBoard;
