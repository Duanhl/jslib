export function isUndefined(obj: unknown): obj is undefined {
  return typeof obj === 'undefined';
}

export function isUndefinedOrNull(obj: unknown): obj is undefined | null {
  return (isUndefined(obj) || obj == null);
}