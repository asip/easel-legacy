import { Datepicker } from 'vanillajs-datepicker'
import ja from '~/locales/date-picker/ja'
import { computed } from '@vue/reactivity'

import { useElement, useDate } from '~/composables'

export function useCalendar({ el, wordEl }: { el: HTMLElement; wordEl: HTMLInputElement | null }) {
  const { value: word } = useElement(wordEl)

  const date = computed<string>(() => {
    const { isValidDate } = useDate()

    return isValidDate(word.value) ? word.value : ''
  })

  const initCalendar = (): Datepicker => {
    Object.assign(Datepicker.locales, ja)

    let calendar = new Datepicker(el, {
      buttonClass: 'btn',
      format: 'yyyy/mm/dd',
      language: 'ja',
    })

    setChangeEventListener()
    calendar.setDate(Datepicker.parseDate(date.value, 'yyyy/mm/dd'))

    return calendar
  }

  const setChangeEventListener = (): void => {
    el.addEventListener('changeDate', function (e: CustomEvent) {
      // eslint-disable-next-line
      word.value = e.detail.datepicker.getDate('yyyy/mm/dd')
    })
  }

  return { initCalendar, word }
}
