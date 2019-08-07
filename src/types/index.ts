export interface AxiosRequestConfig {
  url: string
  method?: string
  params?: any
  data?: any
  paramsSerializer?: (params: any) => string
}
