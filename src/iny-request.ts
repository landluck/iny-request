import xhr from './xhr'
import { AxiosRequestConfig } from './types'

function axios(config: AxiosRequestConfig): Promise<any> {
  return xhr(config)
}

export default axios
