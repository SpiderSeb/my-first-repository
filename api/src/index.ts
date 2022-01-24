import cors from '@koa/cors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { graphqlMiddleware } from './graphql'
import router from './router'
import * as schema from './schema'
export const app = new Koa()

app.use(cors())
app.use(bodyParser())
app.use(graphqlMiddleware([schema]))
app.use(router.middleware())

app.listen({ port: 4000 }, () => {
  console.log(`🚀 To infinity...and beyond!`)
})
