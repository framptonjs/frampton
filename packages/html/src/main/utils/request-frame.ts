export default function(callback: () => void): void {
  if (typeof window.requestAnimationFrame === 'function') {
    window.requestAnimationFrame(callback);
  } else {
    window.setTimeout(callback, (1000/60));
  }
}
