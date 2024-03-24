declare var document: Document

export function useViewData(){
  const root: HTMLElement | null = document.querySelector('#comments_component')

  const api_origin: string = root?.getAttribute('data-api-origin') ?? ''
  const csrf_token: string = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? ''
  const frame_id: string = root?.getAttribute('data-frame-id') ?? ''

  return { root, api_origin, csrf_token, frame_id }
}
