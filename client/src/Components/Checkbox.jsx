import React from 'react'

export default function Checkbox({
  field: { name, value, onChange, onBlur },
  form: { errors, touched, setFieldValue },
  id,
  label,
  ...props
}) {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="checkbox"
        value={value}
        checked={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
