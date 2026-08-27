<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue'
import { type Locale } from 'vanilla-calendar-pro'

import { useCalendar } from '@/composables'

const date = defineModel<Date | null>()
const { locale = 'ja' } = defineProps<{ locale?: Locale }>()

const calendarRef = useTemplateRef('calendarRef')

onMounted(() => {
  const { initCalendar } = useCalendar({ el: calendarRef.value, date, locale })
  initCalendar()
})
</script>

<template>
  <div ref="calendarRef"></div>
</template>
