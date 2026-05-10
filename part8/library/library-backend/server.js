const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const resolvers = require('./resolvers')
const typeDefs = require('./schema')
const { getUserFromAutHeader } = require('./utils/jwt')
const express = require('express')
const http = require('http')
const { WebSocketServer } = require('ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { useServer } = require('graphql-ws/use/ws')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { expressMiddleware } = require('@as-integrations/express5')
const cors = require('cors')

async function startServer(port) {
  const app = express()
  const httpServer = http.createServer(app)
  const wsServer = new WebSocketServer({ server: httpServer, path: '/' })
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req.headers.authorization
        const currentUser = await getUserFromAutHeader(auth)
        return { currentUser }
      },
    })
  )

  httpServer.listen(port, () => console.log(`Server is now running on http://localhost:${port}`))
}

module.exports = startServer
