import { ref } from 'vue'

import { useHttpHeaders } from './use-http-headers'
import { useApiConstants } from './use-api-constants'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SearchParams = Record<string, any>

interface QueryApiOptions {
  query?: SearchParams
  token?: string
  signal?: AbortSignal | null
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const useQueryApi = async <T>(url: string, options?: QueryApiOptions) => {
  const { commonHeaders } = useHttpHeaders()
  const { baseURL } = useApiConstants()

  const headers: Record<string, string> = commonHeaders.value

  const data = ref<T>()
  // const tokenRef = ref<string>()

  // { token, query = {}, signal }

  if (options?.token) {
    headers.Authorization = `Bearer ${options.token}`
  }

  const queryString = new globalThis.URLSearchParams(options?.query || {}).toString()
  url = `${url}?${queryString}`

  const getOptions: RequestInit = {
    method: 'GET',
    headers,
  }

  if (options?.signal) {
    getOptions.signal = options.signal
  }

  const response = await globalThis.fetch(`${baseURL.value}${url}`, getOptions)

  if (response.ok) {
    data.value = (await response.json()) as T

    // tokenRef.value = response.headers.get('authorization')?.split(' ')[1]
  }

  return { data: data.value, response }
}
