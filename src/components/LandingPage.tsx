import React, { useCallback, useEffect, useState } from 'react'
import ActionsBar from './ActionBar'
import { defineTheme, Theme } from '../lib/defineTheme'
import EditorWindow from './EditorWindow'
import { editor } from 'monaco-editor'
import { OnChange } from '@monaco-editor/react'
import axios from 'axios'
import { getAxiosOptions } from '../lib/axiosOptions'
import { ProcessingStatusIds, SuccessStatusIds } from '../constants/StatusList'
import { StatusToast } from './StatusToast'
import { AlertColor, Backdrop, Box, Button, CircularProgress, Grid } from '@mui/material'
import { LanguageList } from '../constants/LanguageList'
import { CustomInput } from './CustomInput'
import { OutputWindow } from './OutputWindow'
import { Footer } from './Footer'

const LandingPage = () => {
  const [code, setCode] = useState<string>('')
  const defaultTheme = 'dracula'
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const defaultLanguageId = LanguageList[LanguageList.length - 1].id
  const [languageId, setLanguageId] = useState<number>(defaultLanguageId)

  useEffect(() => {
    defineTheme(defaultTheme).then((_: unknown) => setTheme(defaultTheme))
  }, [defaultTheme])

  const [customInput, setCustomInput] = useState<string>('')
  const [outputDetails, setOutputDetails] = useState<string | null>(null)
  const [processing, setProcessing] = useState<boolean>(false)
  const [status, setStatus] = useState<AlertColor | undefined>(undefined)
  const [isCodeValid, setIsCodeValid] = useState<boolean>(true)

  const onSelectedLanguageChange = (newLanguageId: number) => setLanguageId(newLanguageId)

  const onSelectedThemeChange = (newTheme: Theme) => setTheme(newTheme)

  const checkStatus = useCallback(async (token: string) => {
    const options = getAxiosOptions({
      method: 'GET',
      url: process.env.REACT_APP_RAPID_API_URL! + '/submissions/' + token,
    })
    try {
      const response = await axios.request(options)
      const statusId = response.data.status?.id
      // https://ce.judge0.com/#statuses-and-languages-status-get
      // 1: in queue, 2: processing
      if (ProcessingStatusIds.includes(statusId)) {
        setTimeout(() => checkStatus(token), 2000)
        return
      } else {
        setProcessing(false)
        setOutputDetails(response.data)
        setStatus(SuccessStatusIds.includes(statusId) ? 'success' : 'error')
      }
    } catch (err) {
      console.error('error message:', err)
      setProcessing(false)
      setStatus('error')
    }
  }, [])

  const handleCompile = useCallback(() => {
    setOutputDetails(null)
    setProcessing(true)
    // formData: https://ce.judge0.com/#submissions
    const formData = {
      language_id: languageId,
      source_code: btoa(code),
      stdin: btoa(customInput),
    }
    const options = getAxiosOptions({
      method: 'POST',
      data: formData,
      url: process.env.REACT_APP_RAPID_API_URL! + '/submissions',
    })
    axios
      .request(options)
      .then((res) => {
        const { token } = res.data
        checkStatus(token)
      })
      .catch((err) => {
        setProcessing(false)
        console.error('error message:', err.response ? err.response.data : err)
      })
  }, [languageId, code, customInput, checkStatus])

  const onChange: OnChange = (value: string | undefined, ev: editor.IModelContentChangedEvent) => {
    if (ev.versionId === 2) {
      // when version id is 2 it means this is the first input so the previous placeholder should be overrode
      setCode(ev.changes[0].text)
    } else setCode(value || '')
  }

  const SubmitButton = () => {
    const getButtonText = () => {
      if (!isCodeValid) return 'Invalid Code ⛔️'
      if (processing) return 'Processing......👷‍♀️'
      return 'Run My Code 🏃‍♀️'
    }

    const isButtonDisabled = !isCodeValid || processing || !code
    return (
      <Button
        onClick={handleCompile}
        disabled={isButtonDisabled}
        variant="contained"
        style={{ marginBottom: '10%' }}
      >
        {getButtonText()}
      </Button>
    )
  }

  return (
    <Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (wholeTheme) => wholeTheme.zIndex.drawer + 1 }}
        open={processing}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <StatusToast status={status} handleStatusChangeOnClose={() => setStatus(undefined)} />
      <ActionsBar
        languageId={languageId}
        setLanguageId={onSelectedLanguageChange}
        theme={theme}
        setTheme={onSelectedThemeChange}
      />
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <Grid container direction="column" rowSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item>
              <EditorWindow
                onChange={onChange}
                code={code}
                theme={theme}
                languageId={languageId}
                onCodeValidation={setIsCodeValid}
              />
            </Grid>
            <Grid item>
              <SubmitButton />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} md={4}>
          <CustomInput customInput={customInput} setCustomInput={setCustomInput} />
          <OutputWindow outputDetails={outputDetails} />
        </Grid>
      </Grid>
      <Footer />
    </Box>
  )
}

export default LandingPage
