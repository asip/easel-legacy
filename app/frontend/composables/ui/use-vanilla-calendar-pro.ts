import { format, parse, tzDate, type Format } from '@formkit/tempo'
import { computed, watch, type Ref } from '@vue/reactivity'
import { Calendar, type Options } from 'vanilla-calendar-pro'

interface VanillaCalendarProOptions {
  el?: Ref<HTMLElement | null>
  date?: Ref<Date | null | undefined>
  calendar?: Calendar | null
  options?: Options & { fmtDate?: Format }
}

export const useVanillaCalendarPro = function ({
  el,
  date,
  calendar,
  options,
}: VanillaCalendarProOptions) {
  const fmtDate = options?.fmtDate ?? 'YYYY/MM/DD'
  if (options?.fmtDate) delete options.fmtDate

  const selectedDate = computed<Date | null | undefined>({
    get() {
      return selectedDateUTC.value ? parse(format(selectedDateUTC.value, fmtDate)) : null
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

  const init = (): Calendar | null => {
    // globalThis.console.log(utcDate.value)

    if (!el?.value) return null

    calendar = new Calendar(el.value, {
      ...options,
      onClickDate(self) {
        // globalThis.console.log(`selected:${self.context.selectedDates[0]}`)
        // globalThis.console.log(`today:${self.context.dateToday}`)
        const value = (self.context.selectedDates[0] ?? '') as string
        if (date) date.value = value ? parse(format(value, fmtDate), fmtDate) : null
      },
    })

    calendar.init()

    return calendar
  }

  const close = () => {
    calendar?.destroy()
  }

  if (date) {
    watch(date, () => {
      selectedDate.value = date.value
    })
  }

  return { selectedDate, init, close }
}
