declare var document: Document

interface ViewData {
  root: HTMLElement | null
  api_origin: string | null | undefined
  csrf_token: string | null | undefined
  frame_id: number | null
}

export function useViewData(){
  const root: HTMLElement | null = document.querySelector('#comments_component')

  const str_frame_id = root?.getAttribute('data-frame-id')

  const viewData: ViewData = {
    root: root,
    api_origin: root?.getAttribute('data-api-origin'),
    csrf_token: document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
    frame_id: str_frame_id ? parseInt(str_frame_id, 10) : null
  }
  //console.log(viewData.api_origin);

  return viewData
}
