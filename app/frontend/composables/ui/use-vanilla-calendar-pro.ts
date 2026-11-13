import { format, parse, tzDate, type Format } from '@formkit/tempo'
import { computed, customRef, watch, type Ref } from '@vue/reactivity'
import { Calendar, type Options } from 'vanilla-calendar-pro'

interface VanillaCalendarProOptions {
  el?: Ref<HTMLElement | null>
  date?: Ref<Date | null | undefined>
  dates?: Ref<Date[] | null | undefined>
  calendar?: Calendar | null
  options?: Options & { fmt?: Format }
}

export const useVanillaCalendarPro = function ({
  el,
  date,
  dates,
  calendar,
  options,
}: VanillaCalendarProOptions) {
  const fmt = options?.fmt ?? 'YYYY/MM/DD'
  if (options?.fmt) delete options.fmt
  // const selectionDatesMode = options?.selectionDatesMode

  const selectedDate = customRef<Date | null | undefined>(() => {
    return {
      get() {
        return selectedDateUTC.value ? parse(format(selectedDateUTC.value, fmt)) : null
      },
      set(value: Date | null) {
        selectedDateUTC.value = value ? tzDate(format(value, 'YYYY-MM-DD HH:mm:ss'), 'utc') : null
      },
    }
  })

  // UTC Date (UTC日付)
  const selectedDateUTC = customRef<Date | null>(() => {
    return {
      get() {
        return calendar ? (calendar.selectedDates.at(0) as Date) : null
      },
      set(value: Date | null) {
        moveToSelectedMonth(value)
        if (calendar) {
          calendar.selectedDates = value ? [value] : []
          if (calendar.context.isInit) calendar.update()
        }
      },
    }
  })

  const selectedDates = customRef<Date[] | null | undefined>(() => {
    return {
      get() {
        return selectedDatesUTC.value
          ? selectedDatesUTC.value.map((date) => parse(format(date, fmt)))
          : []
      },
      set(value: Date[] | null) {
        selectedDatesUTC.value = value?.length
          ? value.map((date) => tzDate(format(date, 'YYYY-MM-DD HH:mm:ss'), 'utc'))
          : null
      },
    }
  })

  // UTC Date Array (UTC日付配列)
  const selectedDatesUTC = customRef<Date[] | null>(() => {
    return {
      get() {
        return calendar ? (calendar.selectedDates as Date[]) : null
      },
      set(value: Date[] | null) {
        moveToSelectedMonth(value?.at(0))
        if (calendar) {
          calendar.selectedDates = value?.length ? value : []
          if (calendar.context.isInit) calendar.update()
        }
      },
    }
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
        if (date) {
          /* && selectionDatesMode == 'single' */
          const value = (self.context.selectedDates[0] ?? '') as string
          date.value = value ? parse(format(value, fmt), fmt) : null
        } else if (dates) {
          /* && (selectionDatesMode == 'multiple' || selectionDatesMode == 'multiple-ranged') */
          const values = self.context.selectedDates as string[]
          dates.value = values.map((value) => parse(format(value, fmt), fmt))
        }
      },
    })

    calendar.init()

    return calendar
  }

  const moveToSelectedMonth = (date: Date | null | undefined) => {
    if (calendar) {
      calendar.selectedYear = date?.getFullYear() ?? utcToday.value.getFullYear()
      calendar.selectedMonth = (date?.getMonth() ?? utcToday.value.getMonth()) as
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
    }
  }

  const close = () => {
    calendar?.destroy()
  }

  if (date) {
    /* && selectionDatesMode == 'single' */
    watch(date, () => {
      selectedDate.value = date.value
    })
  }

  if (dates) {
    /* && (selectionDatesMode == 'multiple' || selectionDatesMode == 'multiple-ranged') */
    watch(dates, () => {
      selectedDates.value = dates.value
    })
  }

  return { selectedDate, selectedDates, init, close }
}
