export default (element: HTMLElement): void => {
  const parent = element.parentNode;

  if (parent) {
    parent.removeChild(element);
  }
};
