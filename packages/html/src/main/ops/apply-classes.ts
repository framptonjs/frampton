import { ClassMap } from '../attributes/classes';


export function applyClasses(element: HTMLElement, classMap: ClassMap): void {
  for (let key in classMap) {
    if (classMap[key]) {
      element.classList.add(key);
    } else {
      element.classList.remove(key);
    }
  }
}