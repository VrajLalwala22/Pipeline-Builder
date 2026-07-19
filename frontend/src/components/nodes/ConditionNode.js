// ConditionNode.js — Conditional branching node

import { memo } from 'react';
import { BaseNode } from './BaseNode';
import { NodeTextField, NodeSelectField } from './NodeField';
import { useNodeState } from '../../hooks/useNodeState';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';

const OPERATOR_OPTIONS = [
  { value: 'equals', label: 'Equals' },
  { value: 'not_equals', label: 'Not Equals' },
  { value: 'contains', label: 'Contains' },
  { value: 'greater_than', label: 'Greater Than' },
  { value: 'less_than', label: 'Less Than' },
  { value: 'is_empty', label: 'Is Empty' },
];

const ConditionNodeComponent = ({ id, data, selected }) => {
  const [operator, setOperator] = useNodeState(
    id,
    'operator',
    data?.operator || 'equals'
  );
  const [compareValue, setCompareValue] = useNodeState(
    id,
    'compareValue',
    data?.compareValue || ''
  );

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="Condition"
      icon={<HiOutlineAdjustmentsHorizontal size={16} />}
      nodeType="condition"
      inputs={[{ id: 'input', label: 'input' }]}
      outputs={[
        { id: 'true', label: 'true' },
        { id: 'false', label: 'false' },
      ]}
    >
      <NodeSelectField
        label="Operator"
        value={operator}
        onChange={setOperator}
        options={OPERATOR_OPTIONS}
      />
      <NodeTextField
        label="Value"
        value={compareValue}
        onChange={setCompareValue}
        placeholder="Compare value..."
      />
    </BaseNode>
  );
};

export const ConditionNode = memo(ConditionNodeComponent);
