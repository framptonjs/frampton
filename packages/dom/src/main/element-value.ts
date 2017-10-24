export default function(element: HTMLElement): string;
export default function(element: any): string {
  return (element.value || '');
}
