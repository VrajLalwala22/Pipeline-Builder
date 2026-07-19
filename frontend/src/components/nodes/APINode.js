// APINode.js — HTTP API request node

import { memo } from 'react';
import { BaseNode } from './BaseNode';
import { NodeTextField, NodeSelectField } from './NodeField';
import { useNodeState } from '../../hooks/useNodeState';
import { HiOutlineGlobeAlt } from 'react-icons/hi2';

const METHOD_OPTIONS = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'DELETE', label: 'DELETE' },
  { value: 'PATCH', label: 'PATCH' },
];

const APINodeComponent = ({ id, data, selected }) => {
  const [method, setMethod] = useNodeState(id, 'method', data?.method || 'GET');
  const [url, setUrl] = useNodeState(id, 'url', data?.url || '');

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="API Request"
      icon={<HiOutlineGlobeAlt size={16} />}
      nodeType="api"
      badge={method}
      inputs={[
        { id: 'url', label: 'url' },
        { id: 'headers', label: 'headers' },
        { id: 'body', label: 'body' },
      ]}
      outputs={[{ id: 'response', label: 'response' }]}
    >
      <NodeSelectField
        label="Method"
        value={method}
        onChange={setMethod}
        options={METHOD_OPTIONS}
      />
      <NodeTextField
        label="URL"
        value={url}
        onChange={setUrl}
        placeholder="https://api.example.com"
      />
    </BaseNode>
  );
};

export const APINode = memo(APINodeComponent);
