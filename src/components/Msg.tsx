import React from 'react'

type PropType = {
  msg: string[]
}
const Msg: React.FC<PropType> = ({ msg }) => {
  return (
    <div className="messages">
      {msg && msg.map((m) => <li key={m}>{m}</li>)}
    </div>
  )
}

export default Msg
