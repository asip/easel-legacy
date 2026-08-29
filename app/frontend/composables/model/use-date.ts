import { computed, type Ref } from '@vue/reactivity'
import { format, parse } from '@formkit/tempo'
import { useDate as useDateUtil } from '@vesperjs/vue'

export const useDate = function (str: Ref<string>) {
  const { isValidDate } = useDateUtil()

  const date = computed<Date | null | undefined>({
    get() {
      const date_ = str.value && isValidDate(str.value) ? str.value : null
      return date_ ? parse(date_, 'YYYY/MM/DD') : null
    },
    set(value: Date | null | undefined) {
      str.value = value ? format(value, 'YYYY/MM/DD') : ''
    },
  })

  return { date }
}
