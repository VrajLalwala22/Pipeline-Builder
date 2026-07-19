import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineArrowDownTray,
  HiOutlineArrowUpTray,
  HiOutlineCircleStack,
  HiOutlineCpuChip,
  HiOutlineDocumentText,
  HiOutlineEnvelope,
  HiOutlineGlobeAlt,
  HiOutlinePhoto,
} from 'react-icons/hi2';

// Single source of truth for node presentation metadata.
export const NODE_DEFINITIONS = {
  customInput: {
    label: 'Input', description: 'Data entry point', category: 'Core',
    color: '#6366F1', icon: HiOutlineArrowDownTray,
  },
  customOutput: {
    label: 'Output', description: 'Data output endpoint', category: 'Core',
    color: '#06B6D4', icon: HiOutlineArrowUpTray,
  },
  text: {
    label: 'Text', description: 'Text template with variables', category: 'Core',
    color: '#3B82F6', icon: HiOutlineDocumentText,
  },
  llm: {
    label: 'LLM', description: 'Language model processing', category: 'Core',
    color: '#A855F7', icon: HiOutlineCpuChip,
  },
  api: {
    label: 'API', description: 'HTTP API request', category: 'Integration',
    color: '#F59E0B', icon: HiOutlineGlobeAlt,
  },
  database: {
    label: 'Database', description: 'Database query', category: 'Integration',
    color: '#10B981', icon: HiOutlineCircleStack,
  },
  email: {
    label: 'Email', description: 'Send email', category: 'Integration',
    color: '#EF4444', icon: HiOutlineEnvelope,
  },
  image: {
    label: 'Image', description: 'Image processing', category: 'Processing',
    color: '#8B5CF6', icon: HiOutlinePhoto,
  },
  condition: {
    label: 'Condition', description: 'Conditional branching', category: 'Processing',
    color: '#F97316', icon: HiOutlineAdjustmentsHorizontal,
  },
};
