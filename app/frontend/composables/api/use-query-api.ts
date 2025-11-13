import { ref } from 'vue'

import { useConstants} from '../'

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const useQueryApi = async <T>({ url, token }: { url: string, token?: string }) => {
  const { commonHeaders } = useConstants()

  const headers: Record<string, string> = commonHeaders.value

  const ok = ref<boolean>(false)
  const data = ref<T>()
  // const tokenRef = ref<string>()

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await globalThis.fetch(url,
    {
      method: 'GET',
      headers
    })

  ok.value = response.ok

  if (ok.value) {
    data.value = (await response.json()) as T

    // tokenRef.value = response.headers.get('authorization')?.split(' ')[1]
  }

  return { ok: ok.value, data: data.value, response: response }
}
