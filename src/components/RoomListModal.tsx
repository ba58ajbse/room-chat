import React from 'react'
import useModal from '../hooks/useModal'
import ModalDisp from './ModalDisp'
import RoomConnect from './RoomConnect'
import { RoomInfoType } from '../interface/interface'

type PropType = {
  roomList: RoomInfoType[]
  connectRoom: (roomName: string) => void
}

const RoomListModal: React.FC<PropType> = ({ roomList, connectRoom }) => {
  const modalState = useModal()

  return (
    <ModalDisp btnValue="room list" modalState={modalState}>
      {roomList &&
        roomList.map((room) => (
          <RoomConnect
            key={room.id}
            room={room}
            connectRoom={connectRoom}
            modalState={modalState}
          />
        ))}
    </ModalDisp>
  )
}

export default RoomListModal
