<template>
  <Suspense>
    <AsyncComments />
  </Suspense>
</template>

<script lang="ts" setup>
import { provide } from 'vue'
import Axios from 'axios'
import AsyncComments from './AsyncComments.vue'
import { useViewData } from '../composables/use_view_data'

const props = defineProps<{
  apiOrigin: string
  csrfToken: string
  frameId: string
}>()

const viewData = useViewData()

viewData.csrf_token = props.csrfToken
viewData.api_origin = props.apiOrigin
viewData.frame_id = props.frameId

Axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': viewData.csrf_token
}

provide('viewData', viewData)
</script>