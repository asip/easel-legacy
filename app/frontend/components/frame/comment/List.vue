<script lang="ts" setup vapor>
import Item from './list/Item.vue'

import { useComment, useRoute } from '../../../composables'

const route = useRoute()
const id: string = route.params?.id ?? ''

const { comments, getComments } = useComment()

await getComments(id)
</script>

<template>
  <div class="pt-2">
    <div v-for="(comment, i) in comments" :key="comment.id">
      <Item v-model="comments[i]" />
    </div>
  </div>
</template>
