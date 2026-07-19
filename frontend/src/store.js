// store.js — Zustand global state for pipeline nodes and edges

import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},

  /**
   * Creates a node with a unique incrementing ID and adds it to the canvas.
   * ID generation and node insertion happen in a single state update.
   */
  addNode: (type, position) => {
    const nodeIDs = { ...get().nodeIDs };
    nodeIDs[type] = (nodeIDs[type] ?? 0) + 1;
    const id = `${type}-${nodeIDs[type]}`;

    set({
      nodeIDs,
      nodes: [
        ...get().nodes,
        {
          id,
          type,
          position,
          data: { id, nodeType: type },
        },
      ],
    });
  },

  /** Applies ReactFlow node change events (drag, select, remove) */
  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  /** Applies ReactFlow edge change events (select, remove) */
  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  /** Creates a new edge connection with smooth step styling */
  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 },
        },
        get().edges
      ),
    });
  },

  /**
   * Updates a specific field within a node's data object.
   * Uses immutable update pattern to prevent stale references.
   */
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, [fieldName]: fieldValue },
          };
        }
        return node;
      }),
    });
  },
}));
