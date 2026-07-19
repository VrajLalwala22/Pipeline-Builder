// index.js — Barrel export and ReactFlow nodeTypes registry
// Adding a new node requires only: (1) create the component, (2) add it here.

import { InputNode } from './InputNode';
import { OutputNode } from './OutputNode';
import { LLMNode } from './LLMNode';
import { TextNode } from './TextNode';
import { APINode } from './APINode';
import { DatabaseNode } from './DatabaseNode';
import { EmailNode } from './EmailNode';
import { ImageNode } from './ImageNode';
import { ConditionNode } from './ConditionNode';

export { InputNode, OutputNode, LLMNode, TextNode };
export { APINode, DatabaseNode, EmailNode, ImageNode, ConditionNode };

/**
 * ReactFlow nodeTypes registry.
 * Keys must match the `type` used in DraggableNode and store.
 */
export const nodeTypes = {
  customInput: InputNode,
  customOutput: OutputNode,
  llm: LLMNode,
  text: TextNode,
  api: APINode,
  database: DatabaseNode,
  email: EmailNode,
  image: ImageNode,
  condition: ConditionNode,
};
