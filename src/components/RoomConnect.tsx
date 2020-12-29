import React, { useState } from 'react'
import useInput from '../hooks/useInput'
import Label from './atoms/Label'
import Input from './atoms/Input'
import { RoomInfoType, UseModalType } from '../interface/interface'
import Button from './atoms/Button'

type PropType = {
  room: RoomInfoType
  connectRoom: (roomName: string) => void
  modalState: UseModalType
}
const RoomConnect: React.FC<PropType> = ({ room, connectRoom, modalState }) => {
  const [btnState, setBtnState] = useState(false)
  const [roomPass, onChgRoomPass, resetPass] = useInput('')

  const connectInfoSend = (roomInfo: RoomInfoType) => {
    if (roomPass === '') return
    if (roomPass !== roomInfo.password) return

    connectRoom(roomInfo.name)
    resetPass()
    modalState.close()
  }

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
          <Button
            className="join-btn"
            value="Join"
            func={() => connectInfoSend(room)}
          />
        </Label>
      )}
    </li>
  )
}

export default RoomConnect
