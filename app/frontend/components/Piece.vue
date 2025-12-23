<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'

const { path } = defineProps<{ path: string }>()

const AsyncComponent = defineAsyncComponent(() => import(`./${path}.vue`))
</script>

<template>
  <Suspense>
    <AsyncComponent />
  </Suspense>
</template>
