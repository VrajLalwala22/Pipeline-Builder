// ResultModal.js — Glassmorphism modal for pipeline analysis results

import {
  HiOutlineXMark,
  HiOutlineCube,
  HiOutlineLink,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineExclamationTriangle,
} from 'react-icons/hi2';

/**
 * Displays pipeline analysis results in a professional modal overlay.
 *
 * @param {{ result: object | null, error: string | null, onClose: () => void }} props
 */
export const ResultModal = ({ result, error, onClose }) => {
  if (!result && !error) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal__header">
          <h2 className="modal__title">
            {error ? 'Pipeline Error' : 'Pipeline Analysis'}
          </h2>
          <button
            className="modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <HiOutlineXMark size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal__body">
          {error ? (
            <div className="modal__error">
              <HiOutlineExclamationTriangle size={24} />
              <p>{error}</p>
            </div>
          ) : (
            <div className="modal__stats">
              {/* Nodes count */}
              <div className="modal__stat">
                <div className="modal__stat-icon modal__stat-icon--indigo">
                  <HiOutlineCube size={22} />
                </div>
                <div className="modal__stat-info">
                  <span className="modal__stat-value">{result.num_nodes}</span>
                  <span className="modal__stat-label">Nodes</span>
                </div>
              </div>

              {/* Edges count */}
              <div className="modal__stat">
                <div className="modal__stat-icon modal__stat-icon--cyan">
                  <HiOutlineLink size={22} />
                </div>
                <div className="modal__stat-info">
                  <span className="modal__stat-value">{result.num_edges}</span>
                  <span className="modal__stat-label">Edges</span>
                </div>
              </div>

              {/* DAG status */}
              <div className="modal__stat">
                <div
                  className={`modal__stat-icon ${
                    result.is_dag
                      ? 'modal__stat-icon--green'
                      : 'modal__stat-icon--red'
                  }`}
                >
                  {result.is_dag ? (
                    <HiOutlineCheckCircle size={22} />
                  ) : (
                    <HiOutlineXCircle size={22} />
                  )}
                </div>
                <div className="modal__stat-info">
                  <span className="modal__stat-value">
                    {result.is_dag ? 'Yes' : 'No'}
                  </span>
                  <span className="modal__stat-label">
                    Directed Acyclic Graph
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal__footer">
          <button className="modal__button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
