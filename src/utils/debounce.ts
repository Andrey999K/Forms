type DebounceFunc<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): DebounceFunc<T> {
  let timer: NodeJS.Timeout | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func.apply(this, args);
      timer = null;
    }, delay);
  };
}
