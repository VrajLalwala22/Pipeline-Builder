// useDynamicVariables.js — Extracts template variables from text and converts to handle configs

import { useMemo } from 'react';
import { parseVariables } from '../utils/variableParser';

/**
 * Parses text for {{variable}} patterns and returns handle configuration
 * arrays suitable for BaseNode's `inputs` prop.
 *
 * Only recomputes when the text content changes (memoized).
 *
 * @param {string} text - The template text to parse
 * @returns {Array<{id: string, label: string}>} Handle configs for each unique variable
 *
 * @example
 * const handles = useDynamicVariables('Hello {{name}}, {{email}}');
 * // => [{ id: 'name', label: 'name' }, { id: 'email', label: 'email' }]
 */
export const useDynamicVariables = (text) => {
  return useMemo(() => {
    const variables = parseVariables(text);
    return variables.map((varName) => ({
      id: varName,
      label: varName,
    }));
  }, [text]);
};
