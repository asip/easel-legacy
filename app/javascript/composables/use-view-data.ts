export function useViewData(){

  const csrfToken = ''
  const apiOrigin = ''
  const frameId = ''

  return { csrfToken, apiOrigin, frameId }
}

export type UseViewDataType = ReturnType<typeof useViewData>
