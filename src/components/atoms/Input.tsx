import React from 'react'

type PropType = {
  id: string
  className?: string
  ph?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<PropType> = ({ id, ph, className, value, onChange }) => {
  return (
    <>
      <input
        type="text"
        id={id}
        className={className}
        placeholder={ph}
        value={value}
        onChange={onChange}
      />
    </>
  )
}

export default Input
