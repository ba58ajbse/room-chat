import React, { useState, useRef, useContext, useEffect } from 'react'
import Peer from 'skyway-js'
import { MsgContext } from '../context/reducer'
import useInput from '../hooks/useInput'
import Button from './atoms/Button'
import Input from './atoms/Input'
import MsgDisp from './MsgDisp'

const skywayKey = process.env.REACT_APP_SKYWAY_KEY
const peer = skywayKey !== undefined ? new Peer({ key: skywayKey }) : ''

const Room: React.FC = () => {
  const [localId, setLocalId] = useState('')
  const [roomId, onChgRoomId] = useInput('')
  const [localText, onChgLocalText, reset] = useInput('')
  const roomState = useRef<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any
  const joinState = useRef<boolean>(false)
  const { dispatch } = useContext(MsgContext)

  useEffect(() => {
    if (peer) {
      peer.once('open', (id) => setLocalId(id))
    }
  }, [])

  const setMsg = (text: string) => {
    dispatch({
      type: 'ADD_MSG',
      payload: { msg: text },
    })
  }

  const joinTrigger = () => {
    if (!peer || !peer.open) return

    const room = peer.joinRoom(roomId, { mode: 'mesh' })
    roomState.current = room

    room.once('open', () => {
      setMsg('=== You joined ===')
      joinState.current = true
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
      joinState.current = false
    })
  }

  const sendMsg = () => {
    if (!joinState.current) return
    roomState.current.send(localText)
    setMsg(`You > ${localText}`)
    reset()
  }

  const leaveTrigger = () => {
    if (!joinState.current) return
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
          <Input ph="Room Name" value={roomId} onChange={onChgRoomId} />
          <Button value="Join" func={joinTrigger} />
          <Button value="Leave" func={leaveTrigger} />
        </div>
        <div>
          <MsgDisp />
          <Input value={localText} onChange={onChgLocalText} />
          <Button value="Send" func={sendMsg} />
        </div>
      </div>
      <p className="meta" id="js-meta" />
    </div>
  )
}

export default Room
