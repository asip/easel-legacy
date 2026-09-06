<script lang="ts" setup>
import { onMounted, onUnmounted, useTemplateRef } from 'vue'
import { type Locale } from 'vanilla-calendar-pro'

import { useCalendar } from '@/composables'

const date = defineModel<Date | null>()
const { locale = 'ja' } = defineProps<{ locale?: Locale }>()

const calendarRef = useTemplateRef('calendarRef')

const { selectedDate, initCalendar, closeCalendar } = useCalendar({ el: calendarRef, date, locale })

onMounted(() => {
  initCalendar()
  selectedDate.value = date.value
})

onUnmounted(() => {
  closeCalendar()
})
</script>

<template>
  <div ref="calendarRef"></div>
</template>
