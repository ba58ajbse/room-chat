import React, { useState } from 'react'
import useInput from '../hooks/useInput'
import Label from './atoms/Label'
import Input from './atoms/Input'
import { RoomInfoType } from '../interface/interface'

type PropType = {
  room: RoomInfoType
}
const RoomConnect: React.FC<PropType> = ({ room }) => {
  const [btnState, setBtnState] = useState(false)
  const [roomPass, onChgRoomPass, resetPass] = useInput('')

  const openInput = () => setBtnState(!btnState)
  return (
    <li key={room.id}>
      <button type="button" onClick={openInput}>
        {room.name}
      </button>
      {btnState && (
        <Label id="room-pass" value="Password" className="room-pass-label">
          <Input
            id="room-pass"
            className="room-pass-input"
            value={roomPass}
            onChange={onChgRoomPass}
          />
        </Label>
      )}
    </li>
  )
}

export default RoomConnect
