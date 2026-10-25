import { computed, type Ref } from '@vue/reactivity'
import { format, parse } from '@formkit/tempo'
import { useDateUtil } from '@vesperjs/vue'

export const useDate = function (str: Ref<string | null | undefined>, fmt = 'YYYY/MM/DD') {
  const { isDate } = useDateUtil()

  const date = computed<Date | null | undefined>({
    get() {
      const date_ = str.value && isDate(str.value) ? str.value : null
      return date_ ? parse(date_, fmt) : null
    },
    set(value: Date | null | undefined) {
      str.value = value ? format(value, fmt) : ''
    },
  })

  return date
}
