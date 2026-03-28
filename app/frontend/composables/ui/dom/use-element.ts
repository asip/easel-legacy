import { computed } from '@vue/reactivity'

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const useElement = function <EL extends Element>(
  el: EL | undefined | null,
  { property }: { property: string },
) {
  const propertyRef = computed<string, string | null | undefined>({
    get() {
      return el && property in el
        ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
          ((el as any)[property] as string)
        : ''
    },
    set(value: string | null | undefined) {
      if (el && property in el) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        ;(el as any)[property] = value ?? ''
      }
    },
  })

  return { property: propertyRef }
}
