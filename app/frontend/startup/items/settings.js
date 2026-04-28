import { app } from '~/settings.json'

import { useSettings } from '../../composables'

const { baseURL } = useSettings()

baseURL.value = app.api.baseURL
