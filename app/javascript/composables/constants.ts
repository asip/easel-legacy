export const root: HTMLElement = document.querySelector('#comment_component');

export const constants: { api_origin: string, csrf_token: string } = {
  api_origin: root.getAttribute('data-api-origin'),
  csrf_token:  document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

//console.log(constants.api_origin);