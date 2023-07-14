import { setupServer } from 'msw/node'
import { handlers } from './msw-handlers'

export function startServer() {
  const server = setupServer(...handlers)
  server.listen({ onUnhandledRequest: "bypass" })
  console.log('MSW initialised')
}
