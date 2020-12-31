import React, { useEffect, useState } from 'react'
import useModal from '../hooks/useModal'
import ModalDisp from './ModalDisp'
import RoomConnect from './RoomConnect'
import { RoomInfoType } from '../interface/interface'
import useFirestore from '../hooks/useFirestore'

type PropType = {
  connectRoom: (roomName: string) => void
}

const RoomListModal: React.FC<PropType> = ({ connectRoom }) => {
  const [roomList, setRoomList] = useState<RoomInfoType[]>([])
  const modalState = useModal()
  const { getRoomList } = useFirestore()

  useEffect(() => {
    if (modalState.isOpen) {
      getRoomList()
        .then((res) => (res.length !== roomList ? setRoomList(res) : roomList))
        .catch((error) => console.log(error))
    }
  }, [modalState.isOpen])
  console.log(roomList)

  return (
    <ModalDisp btnValue="room list" modalState={modalState}>
      {roomList &&
        Array.isArray(roomList) &&
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
