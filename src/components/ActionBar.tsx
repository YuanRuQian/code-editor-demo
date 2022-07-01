import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { OptionType } from '../constants/OptionType'
import { LanguageList } from '../constants/LanguageList'
import { defineTheme, getThemeList, Theme } from '../lib/defineTheme'

type BarSelectProps = {
  inputLabel: string
  selectValue: string
  menuItems: OptionType[]
  onChange: (event: SelectChangeEvent<string>) => void
}

const BarSelect = ({ inputLabel, selectValue, menuItems, onChange }: BarSelectProps) => (
  <FormControl sx={{ m: 2, minWidth: 250 }}>
    <InputLabel id="demo-simple-select-helper-label">{inputLabel}</InputLabel>
    <Select
      labelId="demo-simple-select-helper-label"
      id="demo-simple-select-helper"
      value={selectValue}
      label="Age"
      onChange={onChange}
    >
      {menuItems.map((menuItem) => (
        <MenuItem key={menuItem.id} id={`${menuItem.id}`} value={`${menuItem.id}`}>
          {menuItem.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)

type SelectProps = Omit<BarSelectProps, 'menuItems'>

const LanguageSelect = (selectProps: SelectProps) => (
  <BarSelect {...selectProps} menuItems={LanguageList} />
)

const ThemeSelect = (selectProps: SelectProps) => {
  const themeList = getThemeList()
  return <BarSelect {...selectProps} menuItems={themeList} />
}

type Props = {
  languageId: number
  setLanguageId: (language: number) => void
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ActionsBar = ({ languageId, setLanguageId, theme, setTheme }: Props) => {
  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const newLanguageId = event.target.value
    setLanguageId(Number(newLanguageId))
  }

  const handleThemeChange = (event: SelectChangeEvent<string>) => {
    const newTheme = event.target.value as Theme
    defineTheme(newTheme).then((_: unknown) => setTheme(newTheme))
  }

  return (
    <div>
      <LanguageSelect
        inputLabel="language"
        selectValue={String(languageId)}
        onChange={handleLanguageChange}
      />
      <ThemeSelect inputLabel="theme" selectValue={theme} onChange={handleThemeChange} />
    </div>
  )
}

export default ActionsBar
