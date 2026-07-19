// variableParser.js — Extracts and validates template variables from text

/**
 * Regex to match {{variableName}} patterns.
 * Supports optional whitespace inside braces: {{ name }} is valid.
 * Variable names must be valid JavaScript identifiers:
 *   - Start with letter, underscore, or dollar sign
 *   - Followed by letters, digits, underscores, or dollar signs
 */
const VARIABLE_PATTERN = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

/**
 * Extracts unique, validated variable names from template text.
 *
 * @param {string} text - The text to parse for {{variable}} patterns
 * @returns {string[]} Deduplicated array of valid variable names, in order of first appearance
 *
 * @example
 * parseVariables('Hello {{username}}, your email is {{email}}')
 * // => ['username', 'email']
 *
 * @example
 * parseVariables('{{a}} {{b}} {{a}}')
 * // => ['a', 'b']  (deduplicated)
 */
export const parseVariables = (text) => {
  if (!text || typeof text !== 'string') return [];

  const seen = new Set();
  const variables = [];

  let match;
  // Reset lastIndex for global regex reuse safety
  VARIABLE_PATTERN.lastIndex = 0;

  while ((match = VARIABLE_PATTERN.exec(text)) !== null) {
    const varName = match[1];
    if (!seen.has(varName)) {
      seen.add(varName);
      variables.push(varName);
    }
  }

  return variables;
};
