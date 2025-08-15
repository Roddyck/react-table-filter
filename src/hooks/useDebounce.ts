import { useEffect, useRef } from "react";

type AnyFunction = (...args: any[]) => void;

function useDebounce<T extends AnyFunction>(
  cb: T,
  delay: number
): T {
  const timeoutRef = useRef<number | null>(null);
  const cbRef = useRef(cb);

  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return ((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => cbRef.current(...args), delay);
  }) as T;
}

export { useDebounce };
