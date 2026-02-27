import { ref } from '@vue/reactivity'

import { useHttpHeaders } from './use-http-headers'
import { useApiConstants } from './use-api-constants'

interface MutationApiOptions {
  method: 'post' | 'put' | 'delete'
  body?: FormData | object
  token?: string
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const useMutationApi = async <T>(
  url: string,
  { method, body, token }: MutationApiOptions,
): Promise<{
  data: T | undefined
  response: Response
}> => {
  const { commonHeaders } = useHttpHeaders()
  const { baseURL } = useApiConstants()

  const headers: Record<string, string> = commonHeaders.value

  const data = ref<T>()
  const response = ref<Response>()
  // const tokenRef = ref<string>()

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const isBodyFormData = body && body instanceof FormData

  if (!isBodyFormData) {
    headers['Content-Type'] = 'application/json'
  }

  if (method == 'post' || method == 'put') {
    response.value = await globalThis.fetch(`${baseURL.value}${url}`, {
      method,
      body: isBodyFormData ? body : JSON.stringify(body),
      headers,
    })

    if (response.value.ok) {
      data.value = (await response.value.json()) as T

      // tokenRef.value = response.headers.get('authorization')?.split(' ')[1]
    }
  } else {
    response.value = await globalThis.fetch(`${baseURL.value}${url}`, {
      method,
      headers,
    })
  }

  return { data: data.value, response: response.value }
}
