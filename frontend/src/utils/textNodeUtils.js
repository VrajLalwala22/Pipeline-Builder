// textNodeUtils.js — Width calculation for auto-resizing Text nodes

import { DEFAULT_NODE_WIDTH } from './constants';

export const MAX_TEXT_NODE_WIDTH = 520;
export const TEXT_NODE_HORIZONTAL_PADDING = 80;
export const AVERAGE_CHARACTER_WIDTH = 7;

/**
 * Calculates the optimal width for a Text node based on its content.
 *
 * @param {string} text - The text content
 * @returns {number} Width in pixels, clamped between DEFAULT_NODE_WIDTH and MAX_TEXT_NODE_WIDTH
 */
export const calcTextNodeWidth = (text) => {
  const longestLineLength = Math.max(
    ...text.split('\n').map((line) => line.length),
    0
  );

  return Math.min(
    MAX_TEXT_NODE_WIDTH,
    Math.max(
      DEFAULT_NODE_WIDTH,
      longestLineLength * AVERAGE_CHARACTER_WIDTH + TEXT_NODE_HORIZONTAL_PADDING
    )
  );
};
