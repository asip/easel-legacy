<script lang="ts" setup>
import CommentListAndForm from './comment/ListAndForm.vue'

import { useLocale } from '../../composables'

defineProps<{ viewData?: any }>()
/*
const { viewData } = defineProps<{ viewData?: any }>()
globalThis.console.log(JSON.stringify(viewData))
*/

const { autoDetect } = useLocale()

autoDetect()
</script>

<template>
  <Suspense>
    <CommentListAndForm />
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
