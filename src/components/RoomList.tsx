import React from 'react'
import { RoomInfoType } from '../interface/interface'

type PropType = {
  roomList: RoomInfoType[]
}

const RoomList: React.FC<PropType> = ({ roomList }) => {
  return (
    <ul>
      {roomList && roomList.map((room) => <li key={room.id}>{room.name}</li>)}
    </ul>
  )
}

export default RoomList
