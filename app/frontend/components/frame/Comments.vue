<script lang="ts" setup>
import CommentListAndForm from './comment/ListAndForm.vue'

import { useLocale } from '../../composables'

// const props = defineProps<{}>()

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
