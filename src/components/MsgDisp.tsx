import React, { useContext } from 'react'
import { MsgContext } from '../context/reducer'

const Msg: React.FC = () => {
  const { state } = useContext(MsgContext)
  return (
    <div className="messages">
      {state.msgList && state.msgList.map((m) => <p key={m.id}>{m.msg}</p>)}
    </div>
  )
}

export default Msg
