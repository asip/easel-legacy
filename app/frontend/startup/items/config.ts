import { app } from '@/settings.json'

import { useConfig } from '@/composables'

const { baseURL } = useConfig()

baseURL.value = app.api.baseURL
