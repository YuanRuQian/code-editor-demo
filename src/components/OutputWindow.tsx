import React, { CSSProperties } from 'react'
import { Box, Divider } from '@mui/material'
import { VariantType } from 'notistack'
import { OutputDetails } from './OutputDetails'
import { Base64 } from 'js-base64'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  outputDetails: any
}

type OutputMessageConfig = {
  text: string
  color: VariantType
}

export const OutputWindow = ({ outputDetails }: Props) => {
  if (!outputDetails) return <></>

  const getOutput: () => OutputMessageConfig = () => {
    const statusId = outputDetails?.status?.id

    switch (statusId) {
      case 3:
        return {
          // Accepted
          text: outputDetails?.stdout ? Base64.decode(outputDetails?.stdout) : 'Accepted',
          color: 'success',
        }
      case 5:
        return {
          // Time Limit Exceeded
          text: 'Time Limit Exceeded',
          color: 'error',
        }
      case 6:
        return {
          // Compilation Error
          text: outputDetails?.compile_output
            ? Base64.decode(outputDetails?.compile_output)
            : 'Compilation Error',
          color: 'error',
        }
      default:
        return {
          text: outputDetails?.stderr
            ? Base64.decode(outputDetails?.stderr)
            : 'Something went wrong......',
          color: 'error',
        }
    }
  }

  const { text, color } = getOutput()

  const preBlockStyle: CSSProperties = {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  }

  return (
    <>
      <OutputDetails outputDetails={outputDetails} />
      <Box sx={{ width: '100%', bgcolor: `${color}.main`, color: `${color}.contrastText`, p: 1 }}>
        <h3>Output</h3>
        <Divider flexItem light />
        <pre style={preBlockStyle}>{text}</pre>
      </Box>
    </>
  )
}
