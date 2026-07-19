// useSubmitPipeline.js — Handles pipeline submission to the backend

import { useState, useCallback, useEffect, useRef } from 'react';
import { useStore } from '../store';
import { API_BASE_URL, API_REQUEST_TIMEOUT_MS } from '../utils/constants';

const isPipelineResponse = (value) => (
  value &&
  Number.isInteger(value.num_nodes) &&
  Number.isInteger(value.num_edges) &&
  typeof value.is_dag === 'boolean'
);

/**
 * Manages the pipeline submission lifecycle:
 * - Extracts nodes/edges from the store
 * - POSTs to /pipelines/parse
 * - Tracks loading, error, and result states
 *
 * @returns {{
 *   submit: () => Promise<void>,
 *   loading: boolean,
 *   error: string | null,
 *   result: { num_nodes: number, num_edges: number, is_dag: boolean } | null,
 *   clearResult: () => void
 * }}
 */
export const useSubmitPipeline = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const activeRequestRef = useRef(null);

  useEffect(() => () => activeRequestRef.current?.abort(), []);

  const submit = useCallback(async () => {
    const { nodes, edges } = useStore.getState();

    setLoading(true);
    setError(null);
    setResult(null);

    activeRequestRef.current?.abort();
    const controller = new AbortController();
    activeRequestRef.current = controller;
    const timeoutId = window.setTimeout(
      () => controller.abort(),
      API_REQUEST_TIMEOUT_MS
    );

    try {
      const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (!isPipelineResponse(data)) {
        throw new Error('Server returned an invalid pipeline response.');
      }
      setResult(data);
    } catch (err) {
      setError(
        err.name === 'AbortError'
          ? 'Pipeline analysis timed out. Please try again.'
          : err.message || 'Failed to submit pipeline. Is the backend running?'
      );
    } finally {
      window.clearTimeout(timeoutId);
      if (activeRequestRef.current === controller) {
        activeRequestRef.current = null;
        setLoading(false);
      }
    }
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { submit, loading, error, result, clearResult };
};
