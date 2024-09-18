import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Handler = (...args: any[]) => any;
export function useLatestClosure<T extends Handler>(handler: T) {
  const handlerRef = useRef(handler);
  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args: Parameters<T>): ReturnType<T> => {
    const fn = handlerRef.current;
    return fn(...args);
  }, []);
}
