import { useState, ChangeEvent } from 'react'

const useInput = (
  initialValue = ''
): [string, (e: ChangeEvent<HTMLInputElement>) => void, () => void] => {
  const [value, setValue] = useState(initialValue)

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  const reset = () => setValue('')

  return [value, onChange, reset]
}

export default useInput
