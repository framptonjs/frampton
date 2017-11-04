import { startsWith } from '@frampton/core';

export function isIndex(path: string): boolean {
  return (
    (path === '') ||
    (path === '/') ||
    (startsWith('index.', path))
  );
}
