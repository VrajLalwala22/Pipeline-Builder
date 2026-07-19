// LLMNode.js — Large Language Model node

import { memo } from 'react';
import { BaseNode } from './BaseNode';
import { HiOutlineCpuChip } from 'react-icons/hi2';

const LLMNodeComponent = ({ id, data, selected }) => {
  return (
    <BaseNode
      id={id}
      selected={selected}
      title="LLM"
      icon={<HiOutlineCpuChip size={16} />}
      nodeType="llm"
      badge="GPT-4"
      inputs={[
        { id: 'system', label: 'system' },
        { id: 'prompt', label: 'prompt' },
      ]}
      outputs={[{ id: 'response', label: 'response' }]}
    >
      <p className="node-description">
        Processes input using a large language model to generate intelligent responses.
      </p>
    </BaseNode>
  );
};

export const LLMNode = memo(LLMNodeComponent);
