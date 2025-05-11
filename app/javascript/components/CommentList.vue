<script lang="ts" setup>
import CommentItem from './CommentItem.vue'
import { inject } from 'vue'
import type { UseCommentType } from '../composables/use-comment'

const { comment, comments, getComments } = inject('commenter') as UseCommentType

// @ts-ignore
await getComments(comment.value?.frame_id)
</script>

<template>
  <div v-for="(comment, i) in comments" :key="comment.id">
    <CommentItem v-model="comments[i]" />
  </div>
</template>
