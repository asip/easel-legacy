import { $router } from '../stores'
import { useStore } from '@nanostores/vue'

export function useRoute() {
  const router = useStore($router)

  const params = router.value?.params

  const query = router.value?.search

  const path = router.value?.path

  // globalThis.console.log(path)
  // globalThis.console.log(query)

  return { params, query, path }
}

export type UseRouteType = ReturnType<typeof useRoute>
