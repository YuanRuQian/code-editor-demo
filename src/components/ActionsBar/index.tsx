import React, { useState } from 'react'
import { SelectChangeEvent } from '@mui/material/Select'
import ThemeList from 'monaco-themes/themes/themelist.json'
import BarSelect, { BarSelectProps } from './BarSelect'
import { LanguageOptions } from '../../constants/languageOptions'
import { OptionType } from '../../constants/optionType'
import { getObjectKeys } from '../../utils/object'

type SelectProps = Omit<BarSelectProps, 'menuItems'>

const LanguageSelect = (selectProps: SelectProps) => (
  <BarSelect {...selectProps} menuItems={LanguageOptions} />
)

const ThemeSelect = (selectProps: SelectProps) => {
  const ThemeOptions: OptionType[] = getObjectKeys(ThemeList).map((theme) => ({
    id: theme,
    name: ThemeList[theme],
    label: ThemeList[theme],
    value: theme,
  }))
  return <BarSelect {...selectProps} menuItems={ThemeOptions} />
}

const ActionsBar = () => {
  const [language, setLanguage] = useState<string>('')
  const [theme, setTheme] = useState<string>('')

  const handleLanguageChange = (event: SelectChangeEvent<string>) => setLanguage(event.target.value)
  const handleThemeChange = (event: SelectChangeEvent<string>) => setTheme(event.target.value)

  return (
    <div>
      <LanguageSelect
        inputLabel="language"
        selectValue={language}
        onChange={handleLanguageChange}
      />
      <ThemeSelect inputLabel="theme" selectValue={theme} onChange={handleThemeChange} />
    </div>
  )
}

export default ActionsBar
