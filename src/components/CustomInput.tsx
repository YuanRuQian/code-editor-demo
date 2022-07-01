import { TextareaAutosize } from '@mui/material'
import React, { ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction } from 'react'

export type CustomInputProps = {
  customInput: string
  setCustomInput: Dispatch<SetStateAction<string>>
}

export const CustomInput = ({ customInput, setCustomInput }: CustomInputProps) => {
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => setCustomInput(event.target.value)

  return (
    <TextareaAutosize
      aria-label="minimum height"
      value={customInput}
      onChange={handleChange}
      placeholder="// type down your custom input here"
      minRows={3}
      style={{ width: '100%' }}
    />
  )
}
