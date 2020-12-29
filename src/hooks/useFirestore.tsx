import { useState, useEffect } from 'react'
// import firebase from 'firebase'
import { store } from '../plugins/firebase'
import { RoomInfoType } from '../interface/interface'

const useFirestore = () => {
  const [roomList, setRoomList] = useState<RoomInfoType[]>([])

  useEffect(() => {
    const col = store.collection('roomList')
    const rooms: RoomInfoType[] = []
    col.onSnapshot((docs) => {
      docs.forEach((doc) => {
        rooms.push(doc.data() as RoomInfoType)
      })
      setRoomList(rooms)
    })
  }, [])

  return { roomList }
}

export default useFirestore
