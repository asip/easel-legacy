<script lang="ts" setup>
import CommentListAndForm from './CommentListAndForm.vue'

import { provide } from 'vue'

import { useLocale, useViewData, useRoute } from '../composables'

const props = defineProps<{
  apiBaseUrl: string
  csrfToken: string
}>()

const { autoDetect } = useLocale()
const viewData = useViewData()
const route = useRoute()

autoDetect()

viewData.baseURL.value = props.apiBaseUrl
viewData.csrfToken.value = props.csrfToken

route.params.id = route.path.match(/\/frames\/(?<id>[0-9]*)/)?.groups?.id ?? ''

// globalThis.console.log(route.params.id)
// globalThis.console.log(route.query.q)
// globalThis.console.log(route.query.page)

provide('viewData', viewData)
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
