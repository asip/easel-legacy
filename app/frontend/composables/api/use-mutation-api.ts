import { ref } from 'vue'

import { useConstants} from '../'

interface MutationApiOptions {
  url: string,
  method: 'post' | 'put' | 'delete',
  body?: URLSearchParams | FormData,
  token?: string
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const useMutationApi = async <T>({ url, method, body, token }: MutationApiOptions) => {
  const { commonHeaders } = useConstants()

  const headers: Record<string, string> = commonHeaders.value

  const ok = ref(false)
  const data = ref<T>()
  const response = ref<Response>()
  // const tokenRef = ref<string>()

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  if (method == 'post' || method == 'put') {
    response.value = await globalThis.fetch(url,
      {
        method,
        body,
        headers
      })

    ok.value = response.value.ok

    if (ok.value) {
      data.value = (await response.value.json()) as T

      // tokenRef.value = response.headers.get('authorization')?.split(' ')[1]
    }
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  } else if (method == 'delete') {
    response.value = await globalThis.fetch(url,
      {
        method,
        headers
      })

    ok.value = response.value.ok
  }

  return { ok: ok.value, data: data.value, response: response.value }
}
