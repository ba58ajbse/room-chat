import React, { useState, ChangeEvent, useRef, useContext } from 'react'
import Peer from 'skyway-js'
import { MsgContext } from '../context/reducer'
import Msg from './Msg'

const skywayKey = process.env.REACT_APP_SKYWAY_KEY
const peer = skywayKey !== undefined ? new Peer({ key: skywayKey }) : ''

const Room: React.FC = () => {
  const [localId, setLocalId] = useState('')
  const [roomId, setRoomId] = useState('')
  const { state, dispatch } = useContext(MsgContext)
  const [localText, setLocalText] = useState('')
  const roomState = useRef<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any
  const joinState = useRef<boolean>(false)

  if (peer) {
    peer.once('open', (id) => setLocalId(id))
  }

  const setMsg = (text: string) => {
    dispatch({
      type: 'ADD_MSG',
      payload: { id: state.nextMsgId, msg: text },
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

  const send = () => {
    if (!joinState.current) return
    roomState.current.send(localText)
    setMsg(`You > ${localText}`)
    setLocalText('')
  }

  const leaveTrigger = () => {
    if (!joinState.current) return
    roomState.current.close()
  }

  return (
    <div className="container">
      <h1 className="heading">Room example</h1>
      <p className="note">Change Room mode (before join in a room)</p>
      <div className="room">
        <div>
          <p>
            Your ID: <span>{localId}</span>
          </p>
          <span id="js-room-mode" />
          <input
            type="text"
            placeholder="Room Name"
            value={roomId}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRoomId(e.target.value)
            }
          />
          <button type="button" onClick={joinTrigger}>
            Join
          </button>
          <button type="button" onClick={leaveTrigger}>
            Leave
          </button>
        </div>
        <div>
          <Msg />
          <input
            type="text"
            value={localText}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLocalText(e.target.value)
            }
          />
          <button type="button" onClick={send}>
            Send
          </button>
        </div>
      </div>
      <p className="meta" id="js-meta" />
    </div>
  )
}

export default Room
