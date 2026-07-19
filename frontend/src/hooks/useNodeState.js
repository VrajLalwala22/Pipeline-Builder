// useNodeState.js — Reusable hook for syncing node field state with Zustand store

import { useCallback } from 'react';
import { useStore } from '../store';

/**
 * Manages a single field of a node's data, using the Zustand store as the
 * single source of truth. Falls back to initialValue when the field is not
 * yet persisted in the store.
 *
 * @param {string} nodeId - The node's unique identifier
 * @param {string} fieldName - The field key within node.data
 * @param {*} initialValue - Default value if not present in data
 * @returns {[*, Function]} Tuple of [currentValue, setter]
 */
export const useNodeState = (nodeId, fieldName, initialValue) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const storedValue = useStore(
    (state) => state.nodes.find((node) => node.id === nodeId)?.data?.[fieldName]
  );

  const value = storedValue !== undefined ? storedValue : initialValue;

  const handleChange = useCallback(
    (newValue) => {
      const resolved =
        newValue?.target !== undefined ? newValue.target.value : newValue;
      updateNodeField(nodeId, fieldName, resolved);
    },
    [nodeId, fieldName, updateNodeField]
  );

  return [value, handleChange];
};
