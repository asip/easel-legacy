export function useViewData(){
  const locale = ''
  const frameId = ''

  return { frameId, locale }
}

export type UseViewDataType = ReturnType<typeof useViewData>
