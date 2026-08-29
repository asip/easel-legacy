<script lang="ts" setup vapor>
import { computed } from 'vue'
import { format, parse } from '@formkit/tempo'
import { useDate, useLocale } from '@vesperjs/vue'

import Calendar from './Calendar.vue'

import { useFrameSearch } from '@/composables'

const { isValidDate } = useDate()
const { locale } = useLocale()

const { form, criteria, r$, submit } = useFrameSearch()

const wordDate = computed<Date | null | undefined>({
  get() {
    const date_ = form.value.word && isValidDate(form.value.word) ? form.value.word : null
    return date_ ? parse(date_, 'YYYY/MM/DD') : null
  },
  set(value: Date | null | undefined) {
    form.value.word = value ? format(value, 'YYYY/MM/DD') : ''
  },
})

form.value.word = criteria.value?.word ?? ''
form.value.tag_name = criteria.value?.tag_name ?? ''

const onFormSubmit = async (ev: globalThis.SubmitEvent) => {
  await submit(ev)
}
</script>

<template>
  <div>
    <div class="flex justify-center mb-2">
      <div class="mx-auto">
        <Calendar v-model="wordDate" :locale="locale" />
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
              <div class="text-red-500 text-xs">{{ r$.$errors.word.at(0) ?? '' }}</div>
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
              <div class="text-red-500 text-xs">{{ r$.$errors.tag_name.at(0) ?? '' }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <form action="/" method="get" @submit="onFormSubmit($event)">
      <div class="flex justify-start pt-2">
        <button type="submit" class="btn btn-outline btn-primary">検索</button>
      </div>
    </form>
  </div>
</template>
