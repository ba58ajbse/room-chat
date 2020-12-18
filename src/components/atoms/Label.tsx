import React from 'react'

type PropType = {
  id: string
  value?: string
  className?: string
}

const Label: React.FC<PropType> = ({ id, value, className, children }) => {
  return (
    <label htmlFor={id} className={className}>
      {value}
      {children}
    </label>
  )
}

export default Label
