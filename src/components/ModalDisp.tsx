import React from 'react'
import Modal from 'react-modal'
import Button from './atoms/Button'
import { UseModalType } from '../interface/interface'

type PropType = {
  btnValue: string
  modalState: UseModalType
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

const ModalDisp: React.FC<PropType> = ({ btnValue, modalState, children }) => {
  return (
    <div>
      <Button value={btnValue} func={modalState.open} />
      <Modal
        isOpen={modalState.isOpen}
        onRequestClose={modalState.close}
        style={modalStyle}
      >
        {children}
      </Modal>
    </div>
  )
}

export default ModalDisp
