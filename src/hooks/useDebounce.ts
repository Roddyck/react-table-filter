import { useCallback, useEffect, useRef } from "react";

type AnyFunction = (...args: any[]) => void;

function useDebounce<T extends AnyFunction>(cb: T, delay: number): T {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        cb(...args);
      }, delay);
    }) as T,
    [cb, delay]
  );

  return debouncedCallback;
}

export { useDebounce };
