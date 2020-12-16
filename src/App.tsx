import React, { useReducer } from 'react'
import './assets/App.css'
import Room from './components/Room'
import { msgReducer, initialMsg, MsgContext } from './context/reducer'

const App: React.FC = () => {
  const [state, dispatch] = useReducer(msgReducer, initialMsg)
  return (
    <MsgContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Room />
      </div>
    </MsgContext.Provider>
  )
}

export default App
