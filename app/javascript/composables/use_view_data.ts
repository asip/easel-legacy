export function useViewData(){

  const csrf_token = ''
  const api_origin = ''
  const frame_id = ''

  return { csrf_token, api_origin, frame_id }
}

export type UseViewDataType = ReturnType<typeof useViewData>
