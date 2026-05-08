import { Calendar } from 'vanilla-calendar-pro'
import { format, parse, tzDate } from '@formkit/tempo'
import { computed, Ref } from '@vue/reactivity'

import { useDate } from '@vesperjs/vue'

export const useCalendar = function ({ el, word }: { el?: HTMLElement; word: Ref<string> }) {
  const date = computed<string>(() => {
    const { isValidDate } = useDate()

    return isValidDate(word.value) ? word.value : ''
  })

  // UTC Date (UTC日付)
  const utcDate = computed<Date | null>(() =>
    date.value
      ? tzDate(format(parse(date.value, 'YYYY/MM/DD'), 'YYYY-MM-DD HH:mm:ss'), 'utc')
      : null,
  )

  const utcToday = computed<Date | null>(() => tzDate(new Date(), 'utc'))

  const initCalendar = (): Calendar | null => {
    // globalThis.console.log(utcDate.value)

    if (!el) return null

    let calendar = new Calendar(el, {
      locale: 'ja',
      onClickDate(self) {
        // globalthis.console.log(`selected:${self.context.selectedDates[0]}`)
        // globalthis.console.log(`today:${self.context.dateToday}`)
        const value = (self.context.selectedDates[0] ?? '') as string
        word.value = value ? format(value, 'YYYY/MM/DD') : ''
      },
    })
    if (utcDate.value?.getFullYear()) calendar.selectedYear = utcDate.value.getFullYear()
    if (utcDate.value?.getMonth())
      calendar.selectedMonth = utcDate.value.getMonth() as
        | 0
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 9
        | 10
        | 11

    calendar.selectedDates = utcDate.value ? [utcDate.value] : []
    // globalthis.console.log(calendar.selectedDates[0])
    calendar.init()
    return calendar
  }

  return { initCalendar, utcDate, utcToday }
}
