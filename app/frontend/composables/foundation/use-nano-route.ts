import { Router, RouterConfig } from '@nanostores/router'
import { useStore } from '@nanostores/vue'

export function useNanoRoute<T extends RouterConfig>(nano: Router<T>) {
  const router = useStore(nano)

  const params = router.value?.params

  const query = router.value?.search

  const path = router.value?.path

  // globalThis.console.log(path)
  // globalThis.console.log(query)

  return { params, query, path }
}

export type UseRouteType = ReturnType<typeof useNanoRoute>
