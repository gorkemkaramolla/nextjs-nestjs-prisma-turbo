declare module 'use-debounce' {
  import type { Dispatch, SetStateAction } from 'react';

  interface DebounceOptions {
    readonly maxWait?: number;
    readonly leading?: boolean;
    readonly trailing?: boolean;
  }

  export function useDebounce<T>(
    value: T,
    delay?: number,
    options?: Pick<DebounceOptions, 'maxWait'>
  ): [T];

  export function useDebounceCallback<
    TArgs extends readonly unknown[],
    TResult,
  >(
    callback: (...args: TArgs) => TResult,
    delay?: number,
    options?: DebounceOptions
  ): (...args: TArgs) => void;

  export function useDebouncedState<T>(
    initialState: T,
    delay?: number,
    options?: DebounceOptions
  ): [T, Dispatch<SetStateAction<T>>];
}
