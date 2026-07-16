import { Calendar } from 'vanilla-calendar-pro'
import { format, parse, tzDate } from '@formkit/tempo'
import { computed, Ref } from '@vue/reactivity'

import { useDate } from '@vesperjs/vue'

export const useCalendar = function ({ el, word }: { el?: HTMLElement; word: Ref<string> }) {
  let calendar: Calendar | null = null

  const date = computed<string>({
    get() {
      return utcDate.value ? format(utcDate.value, 'YYYY/MM/DD') : ''
    },
    set(value: string) {
      const { isValidDate } = useDate()

      const date_ = isValidDate(value) ? value : ''

      utcDate.value = date_
        ? tzDate(format(parse(date_, 'YYYY/MM/DD'), 'YYYY-MM-DD HH:mm:ss'), 'utc')
        : null
    },
  })

  // UTC Date (UTC日付)
  const utcDate = computed<Date | null>({
    get() {
      return calendar?.selectedDates.at(0) as Date | null
    },
    set(value: Date | null) {
      if (calendar) {
        calendar.selectedYear = value?.getFullYear() ?? utcToday.value.getFullYear()
        calendar.selectedMonth = (value?.getMonth() ?? utcToday.value.getMonth()) as
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
        calendar.selectedDates = value ? [value] : []
      }
    },
  })

  const utcToday = computed<Date>(() => tzDate(new Date(), 'utc'))

  const initCalendar = (): Calendar | null => {
    // globalThis.console.log(utcDate.value)

    if (!el) return null

    calendar = new Calendar(el, {
      locale: 'ja',
      onClickDate(self) {
        // globalthis.console.log(`selected:${self.context.selectedDates[0]}`)
        // globalthis.console.log(`today:${self.context.dateToday}`)
        const value = (self.context.selectedDates[0] ?? '') as string
        word.value = value ? format(value, 'YYYY/MM/DD') : ''
      },
    })
    // globalthis.console.log(calendar.selectedDates[0])
    date.value = word.value
    return calendar
  }

  return { initCalendar }
}
