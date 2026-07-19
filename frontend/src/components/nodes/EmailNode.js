// EmailNode.js — Email sending node

import { memo } from 'react';
import { BaseNode } from './BaseNode';
import { NodeTextField } from './NodeField';
import { useNodeState } from '../../hooks/useNodeState';
import { HiOutlineEnvelope } from 'react-icons/hi2';

const EmailNodeComponent = ({ id, data, selected }) => {
  const [to, setTo] = useNodeState(id, 'to', data?.to || '');
  const [subject, setSubject] = useNodeState(id, 'subject', data?.subject || '');

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="Email"
      icon={<HiOutlineEnvelope size={16} />}
      nodeType="email"
      inputs={[
        { id: 'to', label: 'to' },
        { id: 'subject', label: 'subject' },
        { id: 'body', label: 'body' },
      ]}
      outputs={[{ id: 'status', label: 'status' }]}
    >
      <NodeTextField
        label="To"
        type="email"
        value={to}
        onChange={setTo}
        placeholder="user@example.com"
      />
      <NodeTextField
        label="Subject"
        value={subject}
        onChange={setSubject}
        placeholder="Email subject..."
      />
    </BaseNode>
  );
};

export const EmailNode = memo(EmailNodeComponent);
