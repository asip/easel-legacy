declare var document: Document

export function useViewData(){
  interface Constants {
    api_origin: string | null | undefined
    csrf_token: string | null | undefined
    frame_id: number | null
  }

  const root: HTMLElement | null = document.querySelector('#comments_component')

  const str_frame_id = root?.getAttribute('data-frame-id')

  const constants: Constants = {
    api_origin: root?.getAttribute('data-api-origin'),
    csrf_token: document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
    frame_id: str_frame_id ? parseInt(str_frame_id, 10) : null
  }
  //console.log(constants.api_origin);

  return { root, constants }
}
