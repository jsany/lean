export const tuple = <T extends string[]>(...args: T) => args;

export const tupleNum = <T extends number[]>(...args: T) => args;

export type TPickOption<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

export type OmitType<T, U> = Pick<
  T,
  { [K in keyof T]: T[K] extends U ? never : K }[keyof T]
>;
