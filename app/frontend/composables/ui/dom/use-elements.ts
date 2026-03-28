export const useElements = function (el: Element | undefined | null) {
  const removeElements = ({ className }: { className: string }): void => {
    if (el) {
      const elements: NodeListOf<Element> = el.querySelectorAll(`.${className}`)
      Array.from(elements).forEach((e) => {
        e.remove()
      })
    }
  }

  return { removeElements }
}
