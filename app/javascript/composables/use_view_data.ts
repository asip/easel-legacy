export function useViewData(){
  const root: HTMLElement | null = document.querySelector('#comments_component')

  const constants: { api_origin: string | null, csrf_token: string, frame_id: string | null } = {
    api_origin: root ? root.getAttribute('data-api-origin') : null,
    csrf_token:  document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    frame_id: root ? root.getAttribute('data-frame-id') : null
  }
  //console.log(constants.api_origin);

  return { root, constants }
}
