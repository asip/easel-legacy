import { createRouter } from '@nanostores/router'

const routes = { frame: '/frames/:id' }

export const router = createRouter(routes, { links: false })

export type RoutesType = typeof routes
