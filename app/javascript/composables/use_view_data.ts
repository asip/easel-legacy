declare var document: Document

export function useViewData(){
  const csrf_token: string = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? ''

  const root: HTMLElement | null = document.querySelector('#comments_component')

  const api_origin: string = root?.getAttribute('data-api-origin') ?? ''
  const frame_id: string = root?.getAttribute('data-frame-id') ?? ''

  return { csrf_token, root, api_origin, frame_id }
}
