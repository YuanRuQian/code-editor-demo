import React from 'react'
import LightModeIcon from '@mui/icons-material/LightMode'
import MemoryIcon from '@mui/icons-material/Memory'
import TimerIcon from '@mui/icons-material/Timer'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'

type DetailsListItemProps = {
  icon: JSX.Element
  property: string
  value: string
}

const DetailsListItem = ({ icon, property, value }: DetailsListItemProps) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar>{icon}</Avatar>
    </ListItemAvatar>
    <ListItemText primary={property} secondary={value} />
  </ListItem>
)

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  outputDetails: any
}

export const OutputDetails = ({ outputDetails }: Props) => {
  const listItems: DetailsListItemProps[] = [
    {
      icon: <LightModeIcon />,
      property: 'Status',
      value: outputDetails?.status?.description || '?',
    },
    { icon: <MemoryIcon />, property: 'Memory', value: `${outputDetails?.memory || '?'} KB` },
    { icon: <TimerIcon />, property: 'Time', value: `${outputDetails?.time || '?'} S` },
  ]

  return (
    <List sx={{ width: '100%' }}>
      {listItems.map((item) => (
        <DetailsListItem key={item.property} {...item} />
      ))}
    </List>
  )
}
