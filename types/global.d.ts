declare interface ViteEnv {
  API_BASE_URL: string
}

declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}
