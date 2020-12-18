export type RoomInfoType = {
  id: string
  name: string
  password: string
}

type Msgtype = {
  id: number
  msg: string
}

export type MsgListType = {
  msgList: Msgtype[]
  nextMsgId: number
}

type AddMsgType = {
  type: 'ADD_MSG'
  payload: { msg: string }
}

export type MsgActionType = AddMsgType

export type UseModalType = {
  isOpen: boolean
  open: () => void
  close: () => void
}
