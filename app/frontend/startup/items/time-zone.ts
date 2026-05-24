import { useTimeZone } from '@vesperjs/vue'

import UniversalCookie from 'universal-cookie'

const cookie = new UniversalCookie()
const { timeZone } = useTimeZone()

if (timeZone.value.client !== cookie.get('time_zone'))
  cookie.set('time_zone', timeZone.value.client)
