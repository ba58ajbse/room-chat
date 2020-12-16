import React, { useState, ChangeEvent, useRef } from 'react'
import Peer from 'skyway-js'
import Msg from './Msg'

const skywayKey = process.env.REACT_APP_SKYWAY_KEY
const peer = skywayKey !== undefined ? new Peer({ key: skywayKey }) : ''

const Room: React.FC = () => {
  const [localId, setLocalId] = useState('')
  const [roomId, setRoomId] = useState('')
  const [msg, setMsg] = useState<string[]>([])
  const [localText, setLocalText] = useState('')
  const roomState = useRef<any>(null)
  const joinState = useRef<boolean>(false)

  if (peer) {
    peer.once('open', (id) => setLocalId(id))
  }

  const joinTrigger = () => {
    if (!peer || !peer.open) return

    const room = peer.joinRoom(roomId, { mode: 'mesh' })
    roomState.current = room

    room.once('open', () => {
      setMsg([...msg, '=== You joined ==='])
      joinState.current = true
    })

    room.on('peerJoin', (peerId) => {
      setMsg([...msg, `=== ${peerId} joined ===`])
    })

    room.on('data', ({ data, src }) => {
      setMsg([...msg, `${src}: ${data}`])
    })

    room.on('peerLeave', (peerId) => {
      setMsg([...msg, `=== ${peerId} left ===`])
    })

    room.once('close', () => {
      setMsg([...msg, '=== You left ==='])
      joinState.current = false
    })
  }

  const send = () => {
    if (!joinState.current) return
    roomState.current.send(localText)
    setMsg([...msg, localText])
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
          <Msg msg={msg} />
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
