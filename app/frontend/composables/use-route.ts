export function useRoute(){
  const params: Record<string, string> = {
  }

  const query: Record<string, string> = {
  }

  return { params, query }
}

export type UseRouteType = ReturnType<typeof useRoute>
