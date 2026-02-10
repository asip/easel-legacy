import { Datepicker } from 'vanillajs-datepicker'
import ja from '~/locales/date-picker/ja'

export function useCalendar({el, wordEl, date}: { el: HTMLElement, wordEl: HTMLInputElement | null, date: string | null }) {
  let calendar: Datepicker | null = null

  const initCalendar = (): Datepicker => {
    Object.assign(Datepicker.locales, ja)

    calendar = new Datepicker(el, {
      buttonClass: 'btn',
      format: 'yyyy/mm/dd',
      language: 'ja'
    })

    setChangeEventListener({ el, wordEl })
    if (date) calendar.setDate(Datepicker.parseDate(date, 'yyyy/mm/dd'))

    return calendar
  }

  const setChangeEventListener = ({ el, wordEl }: { el: HTMLElement, wordEl: HTMLInputElement | null }): void => {

    el.addEventListener('changeDate', function (e: CustomEvent) {
      // eslint-disable-next-line
      if (wordEl) wordEl.value = e.detail.datepicker.getDate('yyyy/mm/dd')
    })
  }

  return { initCalendar }
}
