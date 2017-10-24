export default function apply<T>(fn: () => T): T {
  return fn();
}