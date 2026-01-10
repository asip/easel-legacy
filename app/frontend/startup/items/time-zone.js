import UniversalCookie from 'universal-cookie'

const cookie = new UniversalCookie()
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

if (timeZone !== cookie.get('time_zone')) cookie.set('time_zone', timeZone)
