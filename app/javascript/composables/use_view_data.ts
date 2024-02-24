declare var document: Document

export function useViewData(){
  const root: HTMLElement | null = document.querySelector('#comments_component')

  const str_frame_id = root?.getAttribute('data-frame-id')

  const api_origin: string | null | undefined = root?.getAttribute('data-api-origin')
  const csrf_token: string | null | undefined = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
  const frame_id: number | null = str_frame_id ? parseInt(str_frame_id, 10) : null

  return { root, api_origin, csrf_token, frame_id }
}
