export default function createElement(tag: keyof HTMLElementTagNameMap = 'div',
  classNames: string[] = []): HTMLElement {
  const elem = document.createElement(tag);
  if (classNames.length > 0) elem.classList.add(...classNames);
  return elem;
}
