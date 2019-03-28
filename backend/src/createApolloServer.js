import { ApolloServer } from 'apollo-server-express'
import path from 'path'
import { importSchema } from 'graphql-import'
import { prisma } from './generated/prisma-client'
import resolvers from './resolvers'

// create apollo express server
function createApolloServer () {
  return new ApolloServer({
    typeDefs: importSchema(path.resolve('src/appSchema.graphql')),
    resolvers,
    introspection: true,
    playground: true,
    context: req => ({ ...req, prisma })
  })
}

export default createApolloServer