// DraggableNode.js — Sidebar draggable node card with icon and color

import { NODE_DEFINITIONS } from '../../utils/nodeDefinitions';

export const DraggableNode = ({ type }) => {
  const definition = NODE_DEFINITIONS[type];
  const color = definition?.color || '#6366F1';
  const IconComponent = definition?.icon;

  const onDragStart = (event) => {
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({ nodeType: type })
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="draggable-node"
      onDragStart={onDragStart}
      draggable
      title={definition?.description}
    >
      <div
        className="draggable-node__icon"
        style={{ backgroundColor: `${color}15`, color }}
      >
        {IconComponent && <IconComponent size={18} />}
      </div>
      <div className="draggable-node__info">
        <span className="draggable-node__label">
          {definition?.label || type}
        </span>
        <span className="draggable-node__description">
          {definition?.description}
        </span>
      </div>
    </div>
  );
};
