// BaseNode.js — Core node abstraction component
// All nodes extend this component via configuration props.
// Handles rendering is driven by arrays — no manual <Handle> placement needed.

import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { NODE_DEFINITIONS } from '../../utils/nodeDefinitions';

const BaseNodeComponent = ({
  id,
  selected = false,
  title,
  icon,
  nodeType,
  badge,
  inputs = [],
  outputs = [],
  children,
  footer,
  width,
  height,
}) => {
  const accentColor = NODE_DEFINITIONS[nodeType]?.color || '#6366F1';

  return (
    <div
      className={`base-node ${selected ? 'base-node--selected' : ''}`}
      style={{
        '--node-accent': accentColor,
        width: width || 260,
        height: height || 'auto',
      }}
    >
      <div className="base-node__header">
        <div className="base-node__header-left">
          <div
            className="base-node__icon"
            style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
          >
            {icon}
          </div>
          <span className="base-node__title">{title}</span>
        </div>
        {badge && (
          <span
            className="base-node__badge"
            style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
          >
            {badge}
          </span>
        )}
      </div>

      {children && <div className="base-node__body">{children}</div>}
      {footer && <div className="base-node__footer">{footer}</div>}

      {inputs.map((input, index) => {
        const topPercent =
          input.position ?? ((index + 1) / (inputs.length + 1)) * 100;
        return (
          <Handle
            key={`input-${input.id}`}
            type="target"
            position={Position.Left}
            id={`${id}-${input.id}`}
            className="base-node__handle base-node__handle--target"
            style={{ top: `${topPercent}%` }}
          >
            {input.label && (
              <span className="base-node__handle-label base-node__handle-label--left">
                {input.label}
              </span>
            )}
          </Handle>
        );
      })}

      {outputs.map((output, index) => {
        const topPercent =
          output.position ?? ((index + 1) / (outputs.length + 1)) * 100;
        return (
          <Handle
            key={`output-${output.id}`}
            type="source"
            position={Position.Right}
            id={`${id}-${output.id}`}
            className="base-node__handle base-node__handle--source"
            style={{ top: `${topPercent}%` }}
          >
            {output.label && (
              <span className="base-node__handle-label base-node__handle-label--right">
                {output.label}
              </span>
            )}
          </Handle>
        );
      })}
    </div>
  );
};

export const BaseNode = memo(BaseNodeComponent);
