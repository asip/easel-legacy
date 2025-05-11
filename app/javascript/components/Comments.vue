<script lang="ts" setup>
import { provide } from 'vue'
import Axios from 'axios'
import AsyncComments from './AsyncComments.vue'
import { useViewData } from '../composables/use-view-data'

const props = defineProps<{
  apiOrigin: string
  csrfToken: string
  frameId: string
}>()

const viewData = useViewData()

viewData.csrfToken = props.csrfToken
viewData.apiOrigin = props.apiOrigin
viewData.frameId = props.frameId

Axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': viewData.csrfToken
}

provide('viewData', viewData)
</script>

<template>
  <Suspense>
    <AsyncComments />
  </Suspense>
</template>
