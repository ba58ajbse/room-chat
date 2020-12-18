import React, { useState } from 'react'
import Modal from 'react-modal'
import Button from './atoms/Button'

type PropType = {
  btnValue: string
}

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

Modal.setAppElement('#root')

const ModalDisp: React.FC<PropType> = ({ btnValue, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <div>
      <Button value={btnValue} func={open} />
      <Modal isOpen={isOpen} onRequestClose={close} style={modalStyle}>
        {children}
      </Modal>
    </div>
  )
}

export default ModalDisp