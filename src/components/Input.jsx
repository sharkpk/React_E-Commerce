import React from "react";

function Input({
  label,
  name,
  placeholder,
  type = "text",
  readOnly = false,
  disabled = false,
  required = false,
  onChange = () => {},
  containerClassName = "form my-3",
  ...restProps
}) {
  return (
    <div className={containerClassName}>
      <label htmlFor={name}>{label}</label>
      <input
        {...restProps}
        id={name}
        name={name}
        type={type}
        disabled={disabled}
        readOnly={readOnly}
        onChange={onChange}
        required={required}
        className="form-control"
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
