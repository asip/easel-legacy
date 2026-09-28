<script lang="ts" setup>
import { onMounted, onUnmounted, useTemplateRef } from 'vue'
import { type Options } from 'vanilla-calendar-pro'

import { useVanillaCalendarPro } from '@/composables'

const date = defineModel<Date | null>()
const { options } = defineProps<{ options?: Options }>()

const calendarRef = useTemplateRef('calendarRef')

const { selectedDate, init, close } = useVanillaCalendarPro({
  el: calendarRef,
  date,
  options,
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
