export const root: HTMLElement = document.querySelector('#comment_component');

export const constants: { api_origin: string } = {
  api_origin: root.getAttribute('data-api-origin')
}

//console.log(constants.api_origin);