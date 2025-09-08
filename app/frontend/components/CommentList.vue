<script lang="ts" setup>
import CommentItem from './CommentItem.vue'

import { inject } from 'vue'

import type { UseCommentType, ViewDataType } from '../composables'

const { frameId } = inject('viewData') as ViewDataType
const { comments, getComments } = inject('commenter') as UseCommentType

await getComments(frameId.value)
</script>

<template>
  <div class="pb-5">
    <div v-for="(comment, i) in comments" :key="comment.id">
      <CommentItem v-model="comments[i]" />
    </div>
  </div>
</template>
