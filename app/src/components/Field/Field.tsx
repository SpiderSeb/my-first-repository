import React from 'react'
import classes from './style.module.css'

interface FieldProps {
  editable: boolean
  id?: string
  name: string
  value: string | number
  label: string
  type: 'text' | 'number' | 'date'
  onChange: (name: string, value: string) => void
  'data-testid'?: string
}

const Field = ({
  editable,
  id,
  name,
  value,
  type,
  label,
  onChange,
  'data-testid': dataTestId,
}: FieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value)
  }

  return (
    <div className={classes.container}>
      <label htmlFor={id || name} className={classes.label}>
        {label}
      </label>
      <div className={classes.value}>
        <input
          id={id || name}
          name={name}
          value={value}
          type={type}
          onChange={handleChange}
          readOnly={!editable}
          data-testid={dataTestId || 'input'}
        />
      </div>
    </div>
  )
}

export default Field
