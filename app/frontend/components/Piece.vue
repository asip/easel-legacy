<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'

const { path, viewData } = defineProps<{ path: string, viewData?: string }>()

const viewDataMap = JSON.parse(viewData ?? '{}')

const AsyncComponent = defineAsyncComponent(() => import(`./${path}.vue`))
</script>

<template>
  <Suspense>
    <AsyncComponent :view-data="viewDataMap" />
  </Suspense>
</template>
