import { ref } from 'vue'

import { useHttpHeaders } from './use-http-headers'

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const useQueryApi = async <T>({ url, token }: { url: string, token?: string }) => {
  const { commonHeaders } = useHttpHeaders()

  const headers: Record<string, string> = commonHeaders.value

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

  if (response.ok) {
    data.value = (await response.json()) as T

    // tokenRef.value = response.headers.get('authorization')?.split(' ')[1]
  }

  return { data: data.value, response: response }
}
