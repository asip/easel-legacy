export const root: HTMLElement = document.querySelector('#comment_component');

export const constants: { api_origin: string, csrf_token: string, frame_id: string } = {
  api_origin: root.getAttribute('data-api-origin'),
  csrf_token:  document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
  frame_id: root.getAttribute('data-frame-id')
}

//console.log(constants.api_origin);