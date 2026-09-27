<script lang="ts" setup>
import { onMounted, onUnmounted, useTemplateRef } from 'vue'
import { type Locale } from 'vanilla-calendar-pro'

import { useVanillaCalendarPro } from '@/composables'

const date = defineModel<Date | null>()
const { locale = 'ja' } = defineProps<{ locale?: Locale }>()

const calendarRef = useTemplateRef('calendarRef')

const { selectedDate, init, close } = useVanillaCalendarPro({
  el: calendarRef,
  date,
  locale,
})

onMounted(() => {
  init()
  selectedDate.value = date.value
})

onUnmounted(() => {
  close()
})
</script>

<template>
  <div ref="calendarRef"></div>
</template>
