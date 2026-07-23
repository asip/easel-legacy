<script lang="ts" setup vapor>
import Item from './list/Item.vue'

import { useComments } from '@/composables'

const { frameId } = defineProps<{ frameId: string }>()

const { comments , getComments } = useComments()

await getComments(frameId)
</script>

<template>
  <div class="pt-1">
    <div v-for="(comment, i) in comments" :key="comment.id">
      <Item v-model="comments[i]" />
    </div>
  </div>
</template>
