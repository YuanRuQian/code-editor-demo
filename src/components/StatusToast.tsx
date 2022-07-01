import React, { useEffect } from 'react'
import { SnackbarProvider, VariantType, useSnackbar, OptionsObject } from 'notistack'

type Props = {
  status: VariantType | undefined
  handleStatusChangeOnClose: () => void
}

const Toast = ({ status, handleStatusChangeOnClose }: Props) => {
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const options: OptionsObject = {
      variant: status,
      onClose: handleStatusChangeOnClose,
    }
    const handleStatusChange = () => {
      switch (status) {
        case 'success':
          enqueueSnackbar('Compilation done ✅', options)
          break
        case 'error':
          enqueueSnackbar('Hmmm...... Something went wrong 🤔', options)
          break
        default:
          break
      }
    }
    handleStatusChange()
  }, [enqueueSnackbar, handleStatusChangeOnClose, status])
  return <></>
}

export const StatusToast = (props: Props) => (
  <SnackbarProvider
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    maxSnack={3}
  >
    <Toast {...props} />
  </SnackbarProvider>
)
