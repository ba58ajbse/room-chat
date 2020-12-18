import { createContext } from 'react'
import { MsgListType, MsgActionType } from '../interface/interface'

export const initialMsg = {
  msgList: [],
  nextMsgId: 0,
}

export const MsgContext = createContext(
  {} as {
    state: MsgListType
    dispatch: React.Dispatch<MsgActionType>
  }
)

export const msgReducer = (
  state: MsgListType,
  action: MsgActionType
): MsgListType => {
  switch (action.type) {
    case 'ADD_MSG':
      return {
        ...state,
        msgList: [
          ...state.msgList,
          { id: state.nextMsgId, msg: action.payload.msg },
        ],
        nextMsgId: state.nextMsgId + 1,
      }
    default:
      return state
  }
}
