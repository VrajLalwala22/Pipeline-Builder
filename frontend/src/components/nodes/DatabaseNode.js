// DatabaseNode.js — Database query node

import { memo } from 'react';
import { BaseNode } from './BaseNode';
import { NodeTextField, NodeSelectField } from './NodeField';
import { useNodeState } from '../../hooks/useNodeState';
import { HiOutlineCircleStack } from 'react-icons/hi2';

const DB_TYPE_OPTIONS = [
  { value: 'PostgreSQL', label: 'PostgreSQL' },
  { value: 'MySQL', label: 'MySQL' },
  { value: 'MongoDB', label: 'MongoDB' },
  { value: 'SQLite', label: 'SQLite' },
];

const DatabaseNodeComponent = ({ id, data, selected }) => {
  const [dbType, setDbType] = useNodeState(id, 'dbType', data?.dbType || 'PostgreSQL');
  const [query, setQuery] = useNodeState(id, 'query', data?.query || '');

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="Database"
      icon={<HiOutlineCircleStack size={16} />}
      nodeType="database"
      badge={dbType}
      inputs={[
        { id: 'query', label: 'query' },
        { id: 'connection', label: 'connection' },
      ]}
      outputs={[{ id: 'results', label: 'results' }]}
    >
      <NodeSelectField
        label="Database"
        value={dbType}
        onChange={setDbType}
        options={DB_TYPE_OPTIONS}
      />
      <NodeTextField
        label="Query"
        value={query}
        onChange={setQuery}
        placeholder="SELECT * FROM users"
      />
    </BaseNode>
  );
};

export const DatabaseNode = memo(DatabaseNodeComponent);
