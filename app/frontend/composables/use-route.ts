import { useNanoRoute } from '@vesperjs/vue'
import { $router } from '~/stores'

export const useRoute = function () {
  const { params, query, path } = useNanoRoute($router)
  // globalThis.console.log(path)
  // globalThis.console.log(query)

  return { params, query, path }
}

export type UseRouteType = ReturnType<typeof useRoute>
