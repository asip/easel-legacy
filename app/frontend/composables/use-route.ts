import { useNanoRoute } from './foundation'
import { router, RoutesType } from '~/stores'

export function useRoute() {
  const { params, query, path } = useNanoRoute<RoutesType>(router)
  // globalThis.console.log(path)
  // globalThis.console.log(query)

  return { params, query, path }
}

export type UseRouteType = ReturnType<typeof useRoute>
