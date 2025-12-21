<script lang="ts" setup>
import CommentItem from './Item.vue'

import { useComment, useRoute } from '../../composables'

const route = useRoute()
const id: string = route.params?.id ?? ''

const { comments, getComments } = useComment()

await getComments(id)
</script>

<template>
  <div class="pt-2">
    <div v-for="(comment, i) in comments" :key="comment.id">
      <CommentItem v-model="comments[i]" />
    </div>
  </div>
</template>
