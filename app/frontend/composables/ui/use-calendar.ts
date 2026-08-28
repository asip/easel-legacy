import { format, parse, tzDate } from '@formkit/tempo'
import { computed, watch, type Ref } from '@vue/reactivity'
import { Calendar, Locale } from 'vanilla-calendar-pro'

interface CalendarOptions {
  el?: Ref<HTMLElement | null>
  date?: Ref<Date | null | undefined>
  locale?: Locale
  calendar?: Calendar | null
}

export const useCalendar = function ({ el, date, locale = 'ja', calendar }: CalendarOptions) {
  const selectedDate = computed<Date | null | undefined>({
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
        if (calendar.context.isInit) {
          calendar.update()
        }
      }
    },
  })

  const utcToday = computed<Date>(() => tzDate(new Date(), 'utc'))

  const initCalendar = (): Calendar | null => {
    // globalThis.console.log(utcDate.value)

    if (!el?.value) return null

    calendar = new Calendar(el.value, {
      locale: locale,
      onClickDate(self) {
        // globalThis.console.log(`selected:${self.context.selectedDates[0]}`)
        // globalThis.console.log(`today:${self.context.dateToday}`)
        const value = (self.context.selectedDates[0] ?? '') as string
        if (date) date.value = value ? parse(format(value, 'YYYY/MM/DD'), 'YYYY/MM/DD') : null
      },
    })

    // globalthis.console.log(calendar.selectedDates[0])
    if (date) selectedDate.value = date.value

    calendar.init()

    return calendar
  }

  const closeCalendar = () => {
    calendar?.destroy()
  }

  if (date) {
    watch(date, () => {
      selectedDate.value = date.value
    })
  }

  return { selectedDate, initCalendar, closeCalendar }
}
