// ImageNode.js — Image processing node

import { memo } from 'react';
import { BaseNode } from './BaseNode';
import { NodeSelectField, NodeRangeField } from './NodeField';
import { useNodeState } from '../../hooks/useNodeState';
import { HiOutlinePhoto } from 'react-icons/hi2';

const TRANSFORM_OPTIONS = [
  { value: 'Resize', label: 'Resize' },
  { value: 'Crop', label: 'Crop' },
  { value: 'Filter', label: 'Filter' },
  { value: 'Compress', label: 'Compress' },
];

const ImageNodeComponent = ({ id, data, selected }) => {
  const [transform, setTransform] = useNodeState(
    id,
    'transform',
    data?.transform || 'Resize'
  );
  const [quality, setQuality] = useNodeState(
    id,
    'quality',
    data?.quality ?? 85
  );

  return (
    <BaseNode
      id={id}
      selected={selected}
      title="Image"
      icon={<HiOutlinePhoto size={16} />}
      nodeType="image"
      badge={transform}
      inputs={[
        { id: 'image', label: 'image' },
        { id: 'prompt', label: 'prompt' },
      ]}
      outputs={[{ id: 'processed', label: 'processed' }]}
    >
      <NodeSelectField
        label="Transform"
        value={transform}
        onChange={setTransform}
        options={TRANSFORM_OPTIONS}
      />
      <NodeRangeField
        label="Quality"
        value={Number(quality)}
        onChange={(e) => setQuality(Number(e.target.value))}
        min={10}
        max={100}
        unit="%"
      />
    </BaseNode>
  );
};

export const ImageNode = memo(ImageNodeComponent);
