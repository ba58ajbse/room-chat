import React from 'react'

type PropType = {
  className?: string
  value: string
  func: () => void
}

const Button: React.FC<PropType> = ({ className, value, func }) => {
  return (
    <button type="button" className={className} onClick={func}>
      {value}
    </button>
  )
}

export default Button
