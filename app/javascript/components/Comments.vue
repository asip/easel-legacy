<template>
  <Suspense>
    <AsyncComments />
  </Suspense>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import Axios from 'axios'
import AsyncComments from './AsyncComments.vue'
import { useViewData } from '../composables/use_view_data'

onMounted(() =>{
  const viewData = useViewData()

  Axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': viewData.csrf_token
  }
})
</script>