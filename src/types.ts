export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>
export type KeyOfMap<M extends Map<unknown, unknown>> = M extends Map<infer K, unknown> ? K : never
export type Nullable<T> = T | null | undefined;
export type Constructor<T = object> = new (...args: any[]) => T;