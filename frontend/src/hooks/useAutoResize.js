// useAutoResize.js — Auto-resize hook for textarea elements

import { useEffect, useRef } from 'react';

/**
 * Provides automatic textarea height adjustment.
 *
 * @param {string} text - Current text content (triggers height recalculation)
 * @returns {{ textareaRef: React.Ref }}
 *
 * @example
 * const { textareaRef } = useAutoResize(text);
 * <textarea ref={textareaRef} value={text} onChange={...} />
 */
export const useAutoResize = (text) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [text]);

  return { textareaRef };
};
