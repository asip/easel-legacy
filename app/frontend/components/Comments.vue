<script lang="ts" setup>
import CommentListAndForm from './CommentListAndForm.vue'

import { provide } from 'vue'

import { useLocale } from '../composables'
import { useViewData } from '../composables'
import { useRoute } from '../composables'

const props = defineProps<{
  apiBaseUrl: string
  csrfToken: string
  locale: string
  frameId: string
  page: string
  q: string | null
}>()

const { autoDetect } = useLocale(props.locale)
const viewData = useViewData()
const route = useRoute()

autoDetect()

viewData.baseURL.value = props.apiBaseUrl
viewData.csrfToken.value = props.csrfToken

route.params.id = props.frameId
route.query.q = props.q ?? ''
route.query.page = props.page

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
