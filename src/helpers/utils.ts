export function isURLSearchParams(value: any): value is URLSearchParams {
  return typeof value !== 'undefined' && value instanceof URLSearchParams
}
