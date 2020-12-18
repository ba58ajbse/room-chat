import React from 'react'
import useInput from '../hooks/useInput'
import { RoomInfoType } from '../interface/interface'
import Button from './atoms/Button'
import Input from './atoms/Input'
import Label from './atoms/Label'
import ModalDisp from './ModalDisp'

type PropType = {
  roomList: RoomInfoType[]
  connectRoom: (roomInfo: RoomInfoType) => void
}

const RoomList: React.FC<PropType> = ({ roomList, connectRoom }) => {
  const [roomName, onChgRoomId] = useInput('')
  const [roomPass, onChgRoomPass] = useInput('')

  const connectInfoSend = (roomId: string) => {
    const targetRoom = roomList.find((room) => room.id === roomId)

    if (targetRoom === undefined) return

    if (targetRoom.name !== roomName || targetRoom.password !== roomPass) {
      return
    }

    const roomInfo = {
      id: roomId,
      name: roomName,
      password: roomPass,
    }

    connectRoom(roomInfo)
  }
  return (
    <ul>
      {roomList &&
        roomList.map((room) => (
          <li key={room.id}>
            {room.name}
            <ModalDisp btnValue="connect modal">
              <Label id="room-name" value="Name " className="room-name-label">
                <Input
                  id="room-name"
                  className="room-name-input"
                  value={roomName}
                  onChange={onChgRoomId}
                />
              </Label>
              <Label
                id="room-pass"
                value="Password "
                className="room-pass-label"
              >
                <Input
                  id="room-pass"
                  className="room-pass-input"
                  value={roomPass}
                  onChange={onChgRoomPass}
                />
              </Label>
              <Button
                className="join-btn"
                value="Join"
                func={() => connectInfoSend(room.id)}
              />
            </ModalDisp>
          </li>
        ))}
    </ul>
  )
}

export default RoomList
