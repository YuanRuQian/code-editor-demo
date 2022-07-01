import ThemeList from 'monaco-themes/themes/themelist.json'
import { loader } from '@monaco-editor/react'
import { getObjectKeys } from '../utils/object'

export type Theme = keyof typeof ThemeList

export const defineTheme = (theme: Theme) =>
  new Promise<void>((res) => {
    Promise.all([loader.init(), import(`monaco-themes/themes/${ThemeList[theme]}.json`)]).then(
      ([monaco, themeData]) => {
        monaco.editor.defineTheme(theme, themeData)
        res()
      }
    )
  })

export const getThemeList = () =>
  getObjectKeys(ThemeList).map((theme) => ({
    id: theme,
    name: ThemeList[theme],
    value: theme,
  }))
