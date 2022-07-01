import { Link, Paper } from '@mui/material'
import React, { ReactNode } from 'react'

type FooterLinkProps = {
  link: string
  children: ReactNode
}

const FooterLink = ({ link, children }: FooterLinkProps) => (
  <Link href={link} underline="hover" target="_blank" rel="noreferrer">
    {children}
  </Link>
)

export const Footer = () => (
  <Paper elevation={3} style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
    Powered by{' '}
    <FooterLink link="https://microsoft.github.io/monaco-editor/">Monaco Editor</FooterLink> &{' '}
    <FooterLink link="https://github.com/judge0/judge0">Judge 0</FooterLink> | Presented by{' '}
    <FooterLink link="https://github.com/YuanRuQian">Lydia Yuan</FooterLink>
  </Paper>
)
