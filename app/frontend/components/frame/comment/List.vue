<script lang="ts" setup vapor>
import Item from './list/Item.vue'

import { useComments } from '../../../composables'

const { comments } = useComments()
</script>

<template>
  <div class="pt-2">
    <div v-for="(comment, i) in comments" :key="comment.id">
      <Item v-model="comments[i]" />
    </div>
  </div>
</template>
