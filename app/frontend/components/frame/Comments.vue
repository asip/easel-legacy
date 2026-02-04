<script lang="ts" setup vapor>
import CommentList from './comment/List.vue'
import CommentForm from './comment/Form.vue'

import { useAccount, useComments, useRoute, useToast } from '../../composables'

import { useLocale } from '../../composables'

/*
const { viewData } = defineProps<{ viewData?: any }>()
globalThis.console.log(JSON.stringify(viewData))
*/

const { autoDetect } = useLocale()
const { setFlash } = useToast()
const { authenticate, flash } = useAccount()
const { getComments } = useComments()

autoDetect()

await authenticate()
setFlash(flash.value)

const route = useRoute()
const id: string = route.params?.id ?? ''

await getComments(id)
</script>

<template>
  <div>
    <CommentList />
    <CommentForm />
  </div>
</template>
