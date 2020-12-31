import React from 'react'
import useInput from '../hooks/useInput'
import useModal from '../hooks/useModal'
import ModalDisp from './ModalDisp'
import Input from './atoms/Input'
import Label from './atoms/Label'
import Button from './atoms/Button'
import useFirestore from '../hooks/useFirestore'

type PropType = {
  localId: string
}

const RoomCreateModal: React.FC<PropType> = ({ localId }) => {
  const [roomName, onChgRoomId] = useInput('')
  const [roomPass, onChgRoomPass] = useInput('')
  const modalState = useModal()
  const { addRoom } = useFirestore()

  const setRandomId = () => {
    const string = localId
    const len = string.length
    let id = ''
    for (let i = 0; i < len; i += 1) {
      id += string.charAt(Math.floor(Math.random() * len))
    }

    return id
  }

  const createRoom = () => {
    const roomInfo = {
      id: setRandomId(),
      name: roomName,
      password: roomPass,
    }

    const ret = addRoom(roomInfo)
    console.log(ret)
    modalState.close()
  }
  return (
    <ModalDisp btnValue="create room" modalState={modalState}>
      <Label id="room-name" value="Name " className="room-name-label">
        <Input
          id="room-name"
          className="room-name-input"
          value={roomName}
          onChange={onChgRoomId}
        />
      </Label>
      <Label id="room-pass" value="Password " className="room-pass-label">
        <Input
          id="room-pass"
          className="room-pass-input"
          value={roomPass}
          onChange={onChgRoomPass}
        />
      </Label>
      <Button className="join-btn" value="create" func={createRoom} />
    </ModalDisp>
  )
}

export default RoomCreateModal
