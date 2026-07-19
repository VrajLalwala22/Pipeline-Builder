// constants.js — Design tokens and node configuration constants

import { NODE_DEFINITIONS } from './nodeDefinitions';

/**
 * Sidebar category definitions for node grouping.
 * Order determines display order in the sidebar.
 */
export const NODE_CATEGORIES = Object.values(
  Object.entries(NODE_DEFINITIONS).reduce(
    (categories, [type, definition]) => {
      const category = categories[definition.category] || {
        label: definition.category,
        types: [],
      };

      category.types.push(type);
      categories[definition.category] = category;
      return categories;
    },
    {}
  )
);

/** Default width for BaseNode */
export const DEFAULT_NODE_WIDTH = 260;

/** Backend API base URL */
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
export const API_REQUEST_TIMEOUT_MS = 10_000;
