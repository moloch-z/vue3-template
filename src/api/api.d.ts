declare interface PageResponse<T> {
  total: number
  rows: T[]
  code?: number
  msg?: string
  pages?: number
  currentPage: number
  size: number
}
declare interface ServerResponse<T> {
  code: number
  msg: string
  data: T
}
