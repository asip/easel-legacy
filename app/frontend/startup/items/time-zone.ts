import { useTimeZone } from '@vesperjs/vue'

import { useCookieStore } from '~/composables'

const { timeZone } = useTimeZone()
const { timeZone: clientTZ } = useCookieStore()

if (timeZone.value.client !== clientTZ.value)
  clientTZ.value = timeZone.value.client
