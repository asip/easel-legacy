<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue'

import { useCalendar } from '@/composables'

const date = defineModel<string>()

const calendarRef = useTemplateRef('calendarRef')

onMounted(() => {
  const { initCalendar } = useCalendar({ el: calendarRef.value, date })
  initCalendar()
})
</script>

<template>
  <div ref="calendarRef"></div>
</template>
