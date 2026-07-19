// NodeField.js — Shared form field wrapper for node body inputs

/**
 * Reusable labeled field for node configuration forms.
 *
 * @param {object} props
 * @param {string} props.label - Field label text
 * @param {React.ReactNode} [props.hint] - Optional hint/badge shown beside label
 * @param {React.ReactNode} props.children - The input element
 */
export const NodeField = ({ label, hint, children }) => (
  <div className="node-field">
    <label className="node-field__label">
      {label}
      {hint}
    </label>
    {children}
  </div>
);

/**
 * Text input field with label.
 */
export const NodeTextField = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  hint,
}) => (
  <NodeField label={label} hint={hint}>
    <input
      className="node-field__input"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </NodeField>
);

/**
 * Select dropdown field with label.
 */
export const NodeSelectField = ({ label, value, onChange, options, hint }) => (
  <NodeField label={label} hint={hint}>
    <select className="node-field__select" value={value} onChange={onChange}>
      {options.map(({ value: optValue, label: optLabel }) => (
        <option key={optValue} value={optValue}>
          {optLabel}
        </option>
      ))}
    </select>
  </NodeField>
);

/**
 * Textarea field with label and optional ref forwarding.
 */
export const NodeTextareaField = ({
  label,
  value,
  onChange,
  placeholder,
  hint,
  textareaRef,
  rows = 2,
}) => (
  <NodeField label={label} hint={hint}>
    <textarea
      ref={textareaRef}
      className="node-field__textarea"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
    />
  </NodeField>
);

/**
 * Range slider field with label and value display.
 */
export const NodeRangeField = ({ label, value, onChange, min, max, unit = '' }) => (
  <NodeField
    label={label}
    hint={
      <span className="node-field__var-count">
        {value}
        {unit}
      </span>
    }
  >
    <input
      className="node-field__range"
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
    />
  </NodeField>
);
