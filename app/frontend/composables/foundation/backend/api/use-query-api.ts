import { ref } from 'vue'

import { useHttpHeaders } from './use-http-headers'
import { useApiConstants } from './use-api-constants'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SearchParams = Record<string, any>

interface QueryApiOptions {
  url: string
  query?: SearchParams
  token?: string
  signal?: AbortSignal | null
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const useQueryApi = async <T>({ url, token, query = {}, signal }: QueryApiOptions) => {
  const { commonHeaders } = useHttpHeaders()
  const { baseURL } = useApiConstants()

  const headers: Record<string, string> = commonHeaders.value

  const data = ref<T>()
  // const tokenRef = ref<string>()

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const queryString = new globalThis.URLSearchParams(query).toString()
  url = `${url}?${queryString}`

  const options: RequestInit = {
    method: 'GET',
    headers,
  }

  if (signal) {
    options.signal = signal
  }

  const response = await globalThis.fetch(`${baseURL.value}${url}`, options)

  if (response.ok) {
    data.value = (await response.json()) as T

    // tokenRef.value = response.headers.get('authorization')?.split(' ')[1]
  }

  return { data: data.value, response: response }
}
