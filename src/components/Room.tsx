import React, { useState, useRef, useContext, useEffect } from 'react'
import Peer from 'skyway-js'
import { MsgContext } from '../context/reducer'
import useInput from '../hooks/useInput'
import Button from './atoms/Button'
import Input from './atoms/Input'
import Label from './atoms/Label'
import MsgDisp from './MsgDisp'
import RoomListModal from './RoomListModal'
import RoomCreateModal from './RoomCreateModal'

const skywayKey = process.env.REACT_APP_SKYWAY_KEY
const peer = skywayKey !== undefined ? new Peer({ key: skywayKey }) : ''

const Room: React.FC = () => {
  const [localId, setLocalId] = useState('')
  const [localText, onChgLocalText, reset] = useInput('')
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

  const connectRoom = (roomInfoName: string) => {
    if (!peer || !peer.open) return

    const room = peer.joinRoom(roomInfoName, { mode: 'mesh' })

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
          <RoomCreateModal localId={localId} />
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
        <RoomListModal connectRoom={connectRoom} />
      </div>
      <p className="meta" id="js-meta" />
    </div>
  )
}

export default Room
