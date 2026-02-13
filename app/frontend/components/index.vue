<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'

const { path, viewData: data } = defineProps<{ path: string; viewData?: string }>()

const viewDataMap = JSON.parse(data ?? '{}')
const viewData = viewDataMap && Object.keys(viewDataMap).length !== 0 ? viewDataMap : null

const AsyncComponent = defineAsyncComponent(() => import(/* @vite-ignore */ `./${path}.vue`))
</script>

<template>
  <Suspense>
    <AsyncComponent v-bind="viewData && { viewData }" />
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
