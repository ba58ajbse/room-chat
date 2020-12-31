import { store } from '../plugins/firebase'
import { RoomInfoType } from '../interface/interface'

const useFirestore = (): {
  addRoom: (info: RoomInfoType) => Promise<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  getRoomList: () => Promise<any> // eslint-disable-line @typescript-eslint/no-explicit-any
} => {
  // const collection = useMemo(() => {
  //   const col = store.collection('roomList')
  //   const rooms: RoomInfoType[] = []
  //   col.onSnapshot((docs) => {
  //     docs.forEach((doc) => {
  //       console.log(doc.data())
  //       rooms.push(doc.data() as RoomInfoType)
  //     })
  //     console.log(roomList)
  //     setRoomList(rooms)
  //   })

  //   return col
  // }, [])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getRoomList = async (): Promise<any> => {
    const col = store.collection('roomList')
    const ret = await col
      .get()
      .then((snapshots) => snapshots.docs.map((doc) => doc.data()))
      .catch((error) => console.log(error))

    return ret
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addRoom = async (info: RoomInfoType): Promise<any> => {
    const col = store.collection('roomList')
    const ret = await col
      .add(info)
      .then((res) => res.id)
      .catch((error) => error)

    return ret
  }

  return { addRoom, getRoomList }
}

export default useFirestore
