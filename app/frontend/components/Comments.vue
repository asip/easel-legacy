<script lang="ts" setup>
import CommentListAndForm from './CommentListAndForm.vue'
import { provide } from 'vue'
import Axios from 'axios'
import { useViewData } from '../composables/use-view-data'

const props = defineProps<{
  apiBaseUrl: string
  csrfToken: string
  frameId: string
}>()

const viewData = useViewData()

Axios.defaults.baseURL = props.apiBaseUrl

Axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': props.csrfToken,
  'Accept': 'application/json'
}

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
