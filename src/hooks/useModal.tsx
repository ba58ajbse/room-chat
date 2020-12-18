import { useState } from 'react'
import { UseModalType } from '../interface/interface'

const useModal = (): UseModalType => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return { isOpen, open, close }
}

export default useModal
