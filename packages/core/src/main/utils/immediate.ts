export default function immediate<F extends Function>(fn: F): void {
  setTimeout(fn, 0);
}