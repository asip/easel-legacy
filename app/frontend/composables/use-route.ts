export function useRoute(){
  const url = new URL(globalThis.location.href)

  const params: Record<string, string> = {}

  const query: Record<string, string> = Object.fromEntries(url.searchParams.entries())

  const path = url.pathname

  // globalThis.console.log(path)
  // globalThis.console.log(query)

  return { params, query, path }
}

export type UseRouteType = ReturnType<typeof useRoute>
