export default <T>(val: T): (test: T) => boolean =>
  (test: T): boolean => (val === test);