<script lang="ts" setup>
import CommentItem from './CommentItem.vue'

import { inject } from 'vue'

import type { UseCommentsType, UseRouteType } from '../composables'

const route = inject('route') as UseRouteType
const { id } = route.params

const { comments, getComments } = inject('commentList') as UseCommentsType

await getComments(id)
</script>

<template>
  <div class="pb-5">
    <div v-for="(comment, i) in comments" :key="comment.id">
      <CommentItem v-model="comments[i]" />
    </div>
  </div>
</template>
