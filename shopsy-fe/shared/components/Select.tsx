import SelectComponent from 'react-select'
import { FC } from 'react'

interface Props {
  label?: string
  value: { label: string; value: string }
  onChange: (name: string, val: string) => void
  name: string
  required?: boolean
  options: Array<{ label: string; value: string; isDisabled?: boolean }>
  isSearchable?: boolean
}

export const Select: FC<Props> = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  isSearchable = false
}) => {
  const handleChange = (val) => {
    onChange(name, val)
  }
  const getValue = () => {
    if (value) return value.value
    return undefined
  }

  return (
    <div className='select-container'>
      {label && <div className='label'>{label}</div>}
      <SelectComponent
        value={value}
        options={options}
        onChange={handleChange}
        isSearchable={isSearchable}
        maxMenuHeight={250}
      />
      {required && (
        <input
          tabIndex={-1}
          autoComplete='off'
          style={{
            opacity: 0,
            height: 0,
            position: 'absolute'
          }}
          value={getValue()}
          required={required}
        />
      )}
      <style jsx>{`
        .label {
          margin-bottom: 5px;
        }
        .select-container {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  )
}
