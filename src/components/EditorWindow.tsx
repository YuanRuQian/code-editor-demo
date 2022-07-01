import React, { Dispatch, SetStateAction } from 'react'
import Editor, { OnChange } from '@monaco-editor/react'
import { Theme } from '../lib/defineTheme'
import { editor } from 'monaco-editor'
import { getLanguageValueById } from '../constants/LanguageList'

type Props = {
  onChange: OnChange
  languageId: number
  code: string
  theme: Theme
  onCodeValidation: Dispatch<SetStateAction<boolean>>
}

const EditorWindow = ({ onChange, languageId, code, theme, onCodeValidation }: Props) => {
  const handleEditorValidation = (markers: editor.IMarker[]) => {
    markers.forEach((marker) => console.error('code validation error:', marker.message))
    const isCodeValid = markers.length === 0
    onCodeValidation(isCodeValid)
  }

  return (
    <Editor
      height="75vh"
      width="100%"
      language={getLanguageValueById(languageId)}
      value={code}
      theme={theme}
      onChange={onChange}
      onValidate={handleEditorValidation}
      defaultValue="// happy coding <3"
    />
  )
}

export default EditorWindow
