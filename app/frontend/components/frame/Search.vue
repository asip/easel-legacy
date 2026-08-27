<script lang="ts" setup>
import { ref } from 'vue'

import Calendar from './Calendar.vue'

import { useFrameSearch } from '@/composables'

const { form, criteria, r$, submit } = useFrameSearch()

const tagMessage = ref<string>()
const wordMessage = ref<string>()

form.value.word = criteria.value?.word ?? ''
form.value.tag_name = criteria.value?.tag_name ?? ''

// eslint-disable-next-line no-undef
const handleSubmit = async (ev: SubmitEvent) => {
  globalThis.console.log('test')
  await submit(ev)
  wordMessage.value = r$.$errors.word.at(0) ?? ''
  tagMessage.value = r$.$errors.tag_name.at(0) ?? ''
}
</script>

<template>
  <div>
    <div class="flex justify-center mb-2">
      <div class="mx-auto">
        <Calendar v-model="form.word" />
      </div>
    </div>
    <div class="flex justify-start">
      <table class="table table-bordered table-rounded">
        <tbody>
          <tr>
            <td colspan="2">
              <div class="tooltip tooltip-top" data-tip="タグ or 名前 or 撮影/登録/更新日">
                <input
                  id="word"
                  v-model="form.word"
                  type="text"
                  placeholder=""
                  autocomplete="off"
                  class="input input-bordered w-60"
                />
              </div>
              <div class="text-red-500 text-xs">{{ wordMessage }}</div>
            </td>
          </tr>
          <tr>
            <td class="w-[6em]">
              <label for="tag_name">タグ：</label>
            </td>
            <td>
              <input
                id="tag_name"
                v-model="form.tag_name"
                type="text"
                placeholder=""
                autocomplete="off"
                class="input input-bordered w-40"
              />
              <div class="text-red-500 text-xs">{{ tagMessage }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <form action="/" method="get" @submit="handleSubmit($event)">
      <div class="flex justify-start pt-2">
        <button type="submit" class="btn btn-outline btn-primary">検索</button>
      </div>
    </form>
  </div>
</template>
