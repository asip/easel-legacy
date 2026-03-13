import { computed } from '@vue/reactivity'

export function useElement(el: Element | undefined | null) {
  const value = computed<string, string | null | undefined>({
    get() {
      return el ? (el as HTMLInputElement).value : ''
    },
    set(value: string | null | undefined) {
      if (el) (el as HTMLInputElement).value = value ?? ''
    },
  })

  const content = computed<string, string | null | undefined>({
    get() {
      return el ? (el as HTMLDivElement).innerHTML : ''
    },
    set(value: string | null | undefined) {
      if (el) (el as HTMLDivElement).innerHTML = value ?? ''
    },
  })

  const removeElements = ({ className }: { className: string }): void => {
    if (el) {
      const elements: NodeListOf<Element> = el.querySelectorAll(`.${className}`)
      Array.from(elements).forEach((e) => {
        e.remove()
      })
    }
  }

  return { value, content, removeElements }
}
