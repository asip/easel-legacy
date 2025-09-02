<script lang="ts" setup>
import CommentListAndForm from './CommentListAndForm.vue'

import { provide } from 'vue'
import Axios from 'axios'

import { useViewData } from '../composables'

const props = defineProps<{
  apiBaseUrl: string
  csrfToken: string
  locale: string
  frameId: string
}>()

const viewData = useViewData()

Axios.defaults.baseURL = props.apiBaseUrl

Axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': props.csrfToken,
  'Accept': 'application/json',
  'Accept-Language': props.locale
}

viewData.locale = props.locale
viewData.frameId = props.frameId

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
