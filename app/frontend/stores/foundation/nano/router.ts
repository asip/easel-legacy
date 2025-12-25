import { createRouter } from '@nanostores/router'

export const $router = createRouter(
  { frame: '/frames/:id' },
  { links: false }
)
