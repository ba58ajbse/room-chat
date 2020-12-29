import React from 'react'
import useFirestore from '../hooks/useFirestore'
import useModal from '../hooks/useModal'
import ModalDisp from './ModalDisp'
import RoomConnect from './RoomConnect'
import { RoomInfoType } from '../interface/interface'

type PropType = {
  roomList: RoomInfoType[]
  connectRoom: () => void
}

const RoomListModal: React.FC<PropType> = ({ roomList, connectRoom }) => {
  const modalState = useModal()
  // const { roomList } = useFirestore()

  return (
    <ModalDisp btnValue="room list" modalState={modalState}>
      {roomList &&
        roomList.map((room) => <RoomConnect key={room.id} room={room} />)}
    </ModalDisp>
  )
}

export default RoomListModal
