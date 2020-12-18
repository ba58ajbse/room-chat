import React, { useState, useRef, useContext, useEffect } from 'react'
import Peer from 'skyway-js'
import { MsgContext } from '../context/reducer'
import useInput from '../hooks/useInput'
import useModal from '../hooks/useModal'
import Button from './atoms/Button'
import Input from './atoms/Input'
import Label from './atoms/Label'
import ModalDisp from './ModalDisp'
import MsgDisp from './MsgDisp'
import RoomList from './RoomList'

import { RoomInfoType } from '../interface/interface'

const skywayKey = process.env.REACT_APP_SKYWAY_KEY
const peer = skywayKey !== undefined ? new Peer({ key: skywayKey }) : ''

const Room: React.FC = () => {
  const [localId, setLocalId] = useState('')
  const [roomName, onChgRoomId] = useInput('')
  const [roomPass, onChgRoomPass] = useInput('')
  const [localText, onChgLocalText, reset] = useInput('')
  const modalState = useModal()
  const [roomList, setRoomList] = useState<RoomInfoType[]>([])
  const [joinState, setJoinState] = useState<boolean>(false)
  const roomState = useRef<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any
  const { dispatch } = useContext(MsgContext)

  useEffect(() => {
    if (peer) {
      peer.once('open', (id) => setLocalId(id))
    }
  }, [localId])

  const setMsg = (text: string) => {
    dispatch({
      type: 'ADD_MSG',
      payload: { msg: text },
    })
  }

  // todo 外に出す
  const setRandomId = () => {
    const string = localId
    const len = string.length
    let id = ''
    for (let i = 0; i < len; i += 1) {
      id += string.charAt(Math.floor(Math.random() * len))
    }

    return id
  }

  const addRoomList = () => {
    const roomInfo = {
      id: setRandomId(),
      name: roomName,
      password: roomPass,
    }

    setRoomList([...roomList, roomInfo])
    modalState.close()
  }

  const createRoom = () => {
    if (!peer || !peer.open) return
    if (!roomName || !roomPass) return

    addRoomList()
  }

  const connectRoom = (roomInfo: RoomInfoType) => {
    console.log(roomInfo)
    if (!peer || !peer.open) return
    if (!roomName || !roomPass) return

    const room = peer.joinRoom(roomName, { mode: 'mesh' })

    roomState.current = room

    room.once('open', () => {
      setMsg('=== You joined ===')
      setJoinState(true)
    })

    room.on('peerJoin', (peerId) => {
      setMsg(`=== ${peerId} joined ===`)
    })

    room.on('data', ({ data, src }) => {
      setMsg(`${src} > ${data}`)
    })

    room.on('peerLeave', (peerId) => {
      setMsg(`=== ${peerId} left ===`)
    })

    room.once('close', () => {
      setMsg('=== You left ===')
      setJoinState(false)
    })
  }

  const sendMsg = () => {
    if (!joinState) return
    roomState.current.send(localText)
    setMsg(`You > ${localText}`)
    reset()
  }

  const leaveRoom = () => {
    if (!joinState) return
    roomState.current.close()
  }

  return (
    <div className="container">
      <h1 className="heading">Room example</h1>
      <div className="room">
        <div>
          <p>
            Your ID: <span>{localId}</span>
          </p>
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
            <Button className="join-btn" value="Join" func={createRoom} />
          </ModalDisp>
          {joinState && <Button value="Leave" func={leaveRoom} />}
        </div>
        <div>
          <MsgDisp />
          <Label id="local-text">
            <Input
              id="local-text"
              value={localText}
              onChange={onChgLocalText}
            />
          </Label>
          <Button value="Send" func={sendMsg} />
        </div>
      </div>
      <div>
        <RoomList roomList={roomList} connectRoom={connectRoom} />
      </div>
      <p className="meta" id="js-meta" />
    </div>
  )
}

export default Room
