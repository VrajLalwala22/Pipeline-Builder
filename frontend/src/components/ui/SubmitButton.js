// SubmitButton.js — Pipeline submit button with loading state

import { HiOutlinePlay, HiOutlineArrowPath } from 'react-icons/hi2';

export const SubmitButton = ({ onSubmit, loading }) => {
  return (
    <button
      className="submit-button"
      onClick={onSubmit}
      disabled={loading}
      type="button"
    >
      {loading ? (
        <>
          <HiOutlineArrowPath size={18} className="submit-button__spinner" />
          <span>Analyzing...</span>
        </>
      ) : (
        <>
          <HiOutlinePlay size={18} />
          <span>Run Pipeline</span>
        </>
      )}
    </button>
  );
};
