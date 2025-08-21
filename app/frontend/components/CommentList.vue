<script lang="ts" setup>
import CommentItem from './CommentItem.vue'

import { inject } from 'vue'

import type { UseCommentType, UseViewDataType } from '../composables'

const { frameId } = inject('viewData') as UseViewDataType
const { comments, getComments } = inject('commenter') as UseCommentType

await getComments(frameId)
</script>

<template>
  <div class="pb-5">
    <div v-for="(comment, i) in comments" :key="comment.id">
      <CommentItem v-model="comments[i]" />
    </div>
  </div>
</template>
