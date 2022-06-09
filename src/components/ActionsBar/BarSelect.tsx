import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { OptionType } from '../../constants/optionType'

export type BarSelectProps = {
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
        <MenuItem key={menuItem.id} id={`${menuItem.id}`} value={menuItem.value}>
          {menuItem.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)

export default BarSelect
