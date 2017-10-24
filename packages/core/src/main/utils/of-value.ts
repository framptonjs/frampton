export default <T>(val: T): () => T =>
  (): T => val;