import { setupWorker } from 'msw/browser'
import { handlersPublishes } from './handlersPublishes'
import { handlersUsers } from './handlersUsers'

const handlers = [...handlersPublishes, ...handlersUsers]
export const worker = setupWorker(...handlers)
