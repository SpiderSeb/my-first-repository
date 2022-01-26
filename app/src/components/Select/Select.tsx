import React from 'react'
import classes from './Select.module.css'

interface SelectProps {
  editable: boolean
  id?: string
  name: string
  value: string | number
  label: string
  options: Array<{ value: string | number; label: string }>
  onChange: (name: string, value: string) => void
  'data-testid'?: string
}
const Select = ({
  editable,
  id,
  name,
  value,
  label,
  options,
  onChange,
  'data-testid': dataTestId,
}: SelectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(name, e.target.value)
  }

  return (
    <div className={classes.container}>
      <label htmlFor={id || name} className={classes.label}>
        {label}
      </label>
      <div className={classes.value}>
        {editable ? (
          <select
            id={id || name}
            name={name}
            onChange={handleChange}
            value={value}
            data-testid={dataTestId || 'select'}
          >
            {options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              )
            })}
          </select>
        ) : (
          <input
            readOnly
            id={id || name}
            name={name}
            data-testid={dataTestId || 'select'}
            value={options.find((option) => option.value === value)?.label || 'Unknown'}
          />
        )}
      </div>
    </div>
  )
}

export default Select
