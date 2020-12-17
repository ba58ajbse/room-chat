import React from 'react'

type PropType = {
  value: string
  func: () => void
}

const Button: React.FC<PropType> = ({ value, func }) => {
  return (
    <button type="button" onClick={func}>
      {value}
    </button>
  )
}

export default Button
