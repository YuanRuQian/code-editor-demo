import { AxiosRequestConfig } from 'axios'

type Props = {
  method: string
  data?: unknown
  url: string
}

export const getAxiosOptions = ({ method, data, url }: Props) => {
  const options: AxiosRequestConfig = {
    method,
    url,
    params: { base64_encoded: 'true', fields: '*' },
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST!,
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY!,
    },
    data,
  }
  return options
}
