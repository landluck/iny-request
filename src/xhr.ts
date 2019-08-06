import { AxiosRequestConfig } from './types'

export default function xhr(options: AxiosRequestConfig): Promise<any> {
  return new Promise((resolve, reject) => {
    const { url, method, data } = options

    const request = new XMLHttpRequest()

    request.open(method!, url, true)

    request.send(data)
  })
}
