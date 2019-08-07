import { isURLSearchParams } from './utils'

function encode(value: string): string {
  return encodeURIComponent(value)
    .replace(/%40/gi, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any, paramsSerializer?: (params: any) => string) {
  // 没有参数，直接返回 url
  if (!params) return url

  let resultURL: string = ''

  // axios 这里直接每一个请求直接传入一个 paramsSerializer 函数，用来格式化参数的
  // 所以这里我们先判断是否存在这个函数，有的话直接调用即可
  // 同时给我们的 AxiosRequestConfig 中添加这个类型
  if (paramsSerializer) {
    resultURL = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    // params 也有可能传入一个URLSearchParams 类型的数据，如果是，我们直接 toString 即可
    resultURL = params.toString()
  } else {
    // 这里就需要对普通对象、数组来进行处理了
    const part: string[] = []

    Object.keys(params).forEach(key => {
      let value = params[key]

      // 过滤掉 null 和 undefined
      if (value === null || typeof value === 'undefined') {
        return
      }

      // 判断是否是数组, 数组需要将参数格式化为 'a[]=1&a[]=3&a[]=4' 这种
      if (Array.isArray(value)) {
        key += '[]'
      } else {
        // 这里将不是 数组的 数组转换为数组，方便后面循环处理
        value = [value]
      }

      // 循环将 k v 处理成 ['a=1','b=2']，并放置于 part 容器中
      value.forEach((val: any) => {
        // 这里是 axios 会讲 k 和 v 通过 url 编码，并且将一些特殊字符编译回来
        part.push(`${encode(key)}=${val}`)
      })
    })

    // 将 ['a=1','b=2'] 处理成 'a=1&b=2' 格式
    resultURL = part.join('&')
  }

  if (resultURL) {
    // 针对带有 # 哈希的 url 进行处理
    const index = url.indexOf('#')
    if (index !== -1) {
      url = url.slice(0, index)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + resultURL
  }

  return url
}
