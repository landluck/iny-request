import { AxiosRequestConfig } from './types'
import { buildURL } from './helpers/buildUrl'

export default function xhr(options: AxiosRequestConfig): Promise<any> {
  return new Promise((resolve, reject) => {
    const { url, method, data, params } = options

    const request = new XMLHttpRequest()

    // 这里使用我们的buildURL
    // 大家可能注意到我们这里的 method 后面，添加了一个 ! ,那是因为在我们的
    // AxioxRequestConfig 中，method 不是必须的参数，但这里是必须有的，所以我们在这里断言
    // method 肯定不为空，在 ts 中可以在一个值后面，使用 !来断言一个值不为空

    request.open(method!, buildURL(url, params), true)

    request.send(data)
  })
}
