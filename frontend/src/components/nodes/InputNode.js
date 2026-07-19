// InputNode.js — Data input entry point node

import { memo } from 'react';
import { BaseNode } from './BaseNode';
import { NodeTextField, NodeSelectField } from './NodeField';
import { useNodeState } from '../../hooks/useNodeState';
import { HiOutlineArrowDownTray } from 'react-icons/hi2';

const INPUT_TYPE_OPTIONS = [
  { value: 'Text', label: 'Text' },
  { value: 'File', label: 'File' },
];

const InputNodeComponent = ({ id, data, selected }) => {
  const [name, setName] = useNodeState(
    id,
    'inputName',
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useNodeState(
    id,
    'inputType',
    data?.inputType || 'Text'
  );

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="Input"
      icon={<HiOutlineArrowDownTray size={16} />}
      nodeType="customInput"
      outputs={[{ id: 'value', label: 'value' }]}
    >
      <NodeTextField label="Name" value={name} onChange={setName} />
      <NodeSelectField
        label="Type"
        value={inputType}
        onChange={setInputType}
        options={INPUT_TYPE_OPTIONS}
      />
    </BaseNode>
  );
};

export const InputNode = memo(InputNodeComponent);
