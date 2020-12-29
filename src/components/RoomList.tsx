import React from 'react'
import useInput from '../hooks/useInput'
import useModal from '../hooks/useModal'
import { RoomInfoType } from '../interface/interface'
import Button from './atoms/Button'
import Input from './atoms/Input'
import Label from './atoms/Label'
import ModalDisp from './ModalDisp'

type PropType = {
  roomList: RoomInfoType[]
  connectRoom: () => void
}

const RoomList: React.FC<PropType> = ({ roomList, connectRoom }) => {
  const [roomPass, onChgRoomPass, resetPass] = useInput('')
  const modalState = useModal()

  const connectInfoSend = (roomId: string, roomName: string) => {
    const targetRoom = roomList.find(
      (room) => room.id === roomId && room.name === roomName
    )

    if (targetRoom === undefined) return
    if (targetRoom.password !== roomPass) {
      return
    }

    connectRoom()
    resetPass()
    modalState.close()
  }
  return (
    <ul>
      {roomList &&
        roomList.map((room) => (
          <li key={room.id}>
            {room.name}
            <ModalDisp btnValue="connect modal" modalState={modalState}>
              <p>
                Room Name: <span>{room.name}</span>
              </p>
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
                func={() => connectInfoSend(room.id, room.name)}
              />
            </ModalDisp>
          </li>
        ))}
    </ul>
  )
}

export default RoomList
