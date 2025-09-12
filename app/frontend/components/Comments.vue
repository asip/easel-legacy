<script lang="ts" setup>
import CommentListAndForm from './CommentListAndForm.vue'

import { provide } from 'vue'

import { useLocale } from '../composables'
import { useViewData } from '../composables'

const props = defineProps<{
  apiBaseUrl: string
  csrfToken: string
  locale: string
  frameId: string
  page: string
  q: string
}>()

const { autoDetect } = useLocale(props.locale)
const viewData = useViewData()

autoDetect()

viewData.baseURL.value = props.apiBaseUrl
viewData.csrfToken.value = props.csrfToken
viewData.frameId.value = props.frameId
viewData.q.value = props.q
viewData.page.value = props.page


provide('viewData', viewData)
</script>

<template>
  <Suspense>
    <CommentListAndForm />
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
