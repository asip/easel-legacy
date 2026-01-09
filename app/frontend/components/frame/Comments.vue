<script lang="ts" setup vapor>
import CommentList from './comment/List.vue'
import CommentForm from './comment/Form.vue'

import { useAccount, useToast } from '../../composables'

import { useLocale } from '../../composables'

/*
const { viewData } = defineProps<{ viewData?: any }>()
globalThis.console.log(JSON.stringify(viewData))
*/

const { autoDetect } = useLocale()
const { setFlash } = useToast()
const { flash, authenticate } = useAccount()

autoDetect()

await authenticate()
setFlash(flash.value)

</script>

<template>
  <div>
    <CommentList />
    <CommentForm />
  </div>
</template>
