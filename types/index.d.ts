declare type DeepMerge<A, B> = { [AK in keyof A]: A[AK] } & { [BK in keyof B]: B[BK] } & {
  [P in keyof A & keyof B]: A[P] extends object ? (B[P] extends object ? DeepMerge<A[P], B[P]> : B[P]) : B[P]
}

declare type PickArrayItem<T> = T extends Array<infer G> ? G : never
