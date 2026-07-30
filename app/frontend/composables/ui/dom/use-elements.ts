export const useElements = function (el: Element | undefined | null) {
  const removeElements = ({ selector }: { selector: string }): void => {
    if (el) {
      const elements: NodeListOf<Element> = el.querySelectorAll(selector)
      Array.from(elements).forEach((e) => {
        e.remove()
      })
    }
  }

  return { removeElements }
}
