import { useTimeZone } from '@vesperjs/vue'

import { useTimeZoneCookie } from '@/composables'

const { timeZone } = useTimeZone()
const { timeZone: clientTZ } = useTimeZoneCookie()

if (timeZone.value.client !== clientTZ.value) clientTZ.value = timeZone.value.client
