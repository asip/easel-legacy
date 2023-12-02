export function useViewData(){
  const root: HTMLElement | null = document.querySelector('#comments_component')

  const constants: { api_origin: string | null | undefined, csrf_token: string | null | undefined, frame_id: number | null } = {
    api_origin: root?.getAttribute('data-api-origin'),
    csrf_token: document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
    frame_id: root?.getAttribute('data-frame-id') ? parseInt(root?.getAttribute('data-frame-id'), 10) : null
  }
  //console.log(constants.api_origin);

  return { root, constants }
}
