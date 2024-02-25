<template>
  <div v-for="(comment, i) in comments" :key="comment.id">
    <CommentItem v-model="comments[i]" />
  </div>
</template>

<script lang="ts" setup>
import CommentItem from './comment_item.vue'
import { inject } from 'vue'
import type { UseCommentType } from '../composables/use_comment'

const { comments } = inject('commenter') as UseCommentType
</script>