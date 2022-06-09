import React, { useState } from 'react'
import Editor from 'react-monaco-editor'

type Props = {
  onChange: (type: string, code: string) => void
  language: string
  code: string | null
  theme: string
}

function EditorWindow({ onChange, language, code, theme }: Props) {
  const [currentCode, setCurrentCode] = useState<string>(code || '')
  const handleCodeChange = (incomingCode: string) => {
    setCurrentCode(incomingCode)
    onChange('code', incomingCode)
  }
  return (
    <div>
      <Editor
        height="85vh"
        width="100%"
        language={language || 'javascript'}
        value={currentCode}
        theme={theme}
        defaultValue="// Go ahead and code! Don't panic it doesn't break easily <3"
        onChange={handleCodeChange}
      />
    </div>
  )
}

export default EditorWindow
