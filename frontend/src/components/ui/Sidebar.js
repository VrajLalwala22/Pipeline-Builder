// Sidebar.js — Professional left sidebar with categorized node list

import { NODE_CATEGORIES } from '../../utils/constants';
import { DraggableNode } from './DraggableNode';
import { HiOutlineBolt, HiOutlineXMark } from 'react-icons/hi2';

export const Sidebar = ({ isOpen, isMobile, onClose }) => {
  return (
    <>
      {isMobile && isOpen && (
        <div className="sidebar-backdrop" onClick={onClose} aria-hidden="true" />
      )}
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : 'sidebar--closed'}`}>
        <div className="sidebar__header">
          <div className="sidebar__logo">
            <HiOutlineBolt size={20} />
            <span>Pipeline Builder</span>
          </div>
          {isMobile && (
            <button
              className="sidebar__close"
              onClick={onClose}
              aria-label="Close sidebar"
              type="button"
            >
              <HiOutlineXMark size={18} />
            </button>
          )}
          <p className="sidebar__subtitle">Drag nodes to the canvas</p>
        </div>

        <div className="sidebar__content">
          {NODE_CATEGORIES.map((category) => (
            <div key={category.label} className="sidebar__category">
              <h3 className="sidebar__category-label">{category.label}</h3>
              <div className="sidebar__nodes">
                {category.types.map((type) => (
                  <DraggableNode key={type} type={type} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};
