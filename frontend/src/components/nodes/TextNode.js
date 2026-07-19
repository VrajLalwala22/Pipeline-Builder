// TextNode.js — Text template node with dynamic resize and variable parsing

import { memo } from 'react';
import { BaseNode } from './BaseNode';
import { NodeTextareaField } from './NodeField';
import { useNodeState } from '../../hooks/useNodeState';
import { useDynamicVariables } from '../../hooks/useDynamicVariables';
import { useAutoResize } from '../../hooks/useAutoResize';
import { calcTextNodeWidth } from '../../utils/textNodeUtils';
import { HiOutlineDocumentText } from 'react-icons/hi2';

const TextNodeComponent = ({ id, data, selected }) => {
  const [text, setText] = useNodeState(
    id,
    'text',
    data?.text || '{{input}}'
  );

  const dynamicInputs = useDynamicVariables(text);
  const { textareaRef } = useAutoResize(text);
  const width = calcTextNodeWidth(text);

  const varCountHint =
    dynamicInputs.length > 0 ? (
      <span className="node-field__var-count">
        {dynamicInputs.length} var{dynamicInputs.length !== 1 ? 's' : ''}
      </span>
    ) : null;

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="Text"
      icon={<HiOutlineDocumentText size={16} />}
      nodeType="text"
      width={width}
      inputs={dynamicInputs}
      outputs={[{ id: 'output', label: 'output' }]}
    >
      <NodeTextareaField
        label="Text"
        hint={varCountHint}
        value={text}
        onChange={setText}
        placeholder="Enter text with {{variables}}..."
        textareaRef={textareaRef}
      />
    </BaseNode>
  );
};

export const TextNode = memo(TextNodeComponent);
