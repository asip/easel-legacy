import { ref } from 'vue'

import { useHttpHeaders } from './use-http-headers'
import { useApiConstants } from './use-api-constants'

interface MutationApiOptions {
  url: string
  method: 'post' | 'put' | 'delete'
  body?: URLSearchParams | FormData
  token?: string
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const useMutationApi = async <T>({ url, method, body, token }: MutationApiOptions) => {
  const { commonHeaders } = useHttpHeaders()
  const { baseURL } = useApiConstants()

  const headers: Record<string, string> = commonHeaders.value

  const data = ref<T>()
  const response = ref<Response>()
  // const tokenRef = ref<string>()

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  if (method == 'post' || method == 'put') {
    response.value = await globalThis.fetch(`${baseURL.value}${url}`, {
      method,
      body,
      headers,
    })

    if (response.value.ok) {
      data.value = (await response.value.json()) as T

      // tokenRef.value = response.headers.get('authorization')?.split(' ')[1]
    }
  } else if (method == 'delete') { // eslint-disable-line @typescript-eslint/no-unnecessary-condition
    response.value = await globalThis.fetch(`${baseURL.value}${url}`, {
      method,
      headers,
    })
  }

  return { data: data.value, response: response.value }
}
