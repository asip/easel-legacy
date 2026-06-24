<script lang="ts" setup vapor>
import CommentList from './comment/List.vue'
import CommentForm from './comment/Form.vue'

import { app } from '@/settings.json'

import { useLocale } from '@vesperjs/vue'

import { useAccount, useComments, useRoute, useToast, useConfig } from '@/composables'

/*
const { viewData } = defineProps<{ viewData?: any }>()
globalThis.console.log(JSON.stringify(viewData))
*/

const { autodetect } = useLocale()
const { setFlash } = useToast()
const { baseURL } = useConfig()
const { authenticate, flash } = useAccount()
const { getComments } = useComments()

autodetect()

baseURL.value = app.api.baseURL

await authenticate()
setFlash(flash.value)

const route = useRoute()
const id: string = (route.params as { id?: string })?.id ?? ''

await getComments(id)
</script>

<template>
  <div>
    <CommentList />
    <!-- CommentList :frame-id="id" / -->
    <CommentForm :frame-id="id" />
  </div>
</template>
