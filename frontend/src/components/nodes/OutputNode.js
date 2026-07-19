// OutputNode.js — Data output endpoint node

import { memo } from 'react';
import { BaseNode } from './BaseNode';
import { NodeTextField, NodeSelectField } from './NodeField';
import { useNodeState } from '../../hooks/useNodeState';
import { HiOutlineArrowUpTray } from 'react-icons/hi2';

const OUTPUT_TYPE_OPTIONS = [
  { value: 'Text', label: 'Text' },
  { value: 'Image', label: 'Image' },
];

const OutputNodeComponent = ({ id, data, selected }) => {
  const [name, setName] = useNodeState(
    id,
    'outputName',
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useNodeState(
    id,
    'outputType',
    data?.outputType || 'Text'
  );

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="Output"
      icon={<HiOutlineArrowUpTray size={16} />}
      nodeType="customOutput"
      inputs={[{ id: 'value', label: 'value' }]}
    >
      <NodeTextField label="Name" value={name} onChange={setName} />
      <NodeSelectField
        label="Type"
        value={outputType}
        onChange={setOutputType}
        options={OUTPUT_TYPE_OPTIONS}
      />
    </BaseNode>
  );
};

export const OutputNode = memo(OutputNodeComponent);
