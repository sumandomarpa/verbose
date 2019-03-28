require('dotenv').config()
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import createApolloServer from './createApolloServer'

const PORT = 4400

const server = createApolloServer()

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

server.applyMiddleware({
  app,
  path: '/',
})

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT} in ${process.env.NODE_ENV} mode`)
})
