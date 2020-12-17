import React from 'react'

type PropType = {
  ph?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<PropType> = ({ ph, value, onChange }) => {
  return (
    <>
      <input type="text" placeholder={ph} value={value} onChange={onChange} />
    </>
  )
}

export default Input
