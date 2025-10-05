<script lang="ts" setup>
import CommentListAndForm from './CommentListAndForm.vue'

import { provide } from 'vue'

import { useLocale, useConstants, useRoute } from '../composables'

// const props = defineProps<{}>()

const { autoDetect } = useLocale()
const constants = useConstants()
const route = useRoute()

autoDetect()

route.params.id = route.path.match(/\/frames\/(?<id>[0-9]*)/)?.groups?.id ?? ''

// globalThis.console.log(route.params.id)
// globalThis.console.log(route.query.q)
// globalThis.console.log(route.query.page)

provide('constants', constants)
provide('route', route)
</script>

<template>
  <Suspense>
    <CommentListAndForm />
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
