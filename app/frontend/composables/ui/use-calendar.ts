import { Calendar } from 'vanilla-calendar-pro'
import { format, parse, tzDate } from '@formkit/tempo'
import { computed, type Ref } from '@vue/reactivity'

import { useDate } from '@vesperjs/vue'

export const useCalendar = function ({
  el,
  date,
}: {
  el?: HTMLElement | null
  date: Ref<string | undefined>
}) {
  const { isValidDate } = useDate()

  let calendar: Calendar | null = null

  const selectedDateStr = computed<string | undefined>({
    get() {
      return selectedDate.value ? format(selectedDate.value, 'YYYY/MM/DD') : ''
    },
    set(value: string | undefined) {
      const date_ = value && isValidDate(value) ? value : ''
      selectedDate.value = date_ ? parse(date_, 'YYYY/MM/DD') : null
    },
  })

  const selectedDate = computed<Date | null>({
    get() {
      return selectedDateUTC.value ? parse(format(selectedDateUTC.value, 'YYYY/MM/DD')) : null
    },
    set(value: Date | null) {
      selectedDateUTC.value = value ? tzDate(format(value, 'YYYY-MM-DD HH:mm:ss'), 'utc') : null
    },
  })

  // UTC Date (UTC日付)
  const selectedDateUTC = computed<Date | null>({
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
        // globalThis.console.log(`selected:${self.context.selectedDates[0]}`)
        // globalThis.console.log(`today:${self.context.dateToday}`)
        const value = (self.context.selectedDates[0] ?? '') as string
        date.value = value ? format(value, 'YYYY/MM/DD') : ''
      },
    })
    // globalthis.console.log(calendar.selectedDates[0])
    selectedDateStr.value = date.value
    return calendar
  }

  return { initCalendar }
}
