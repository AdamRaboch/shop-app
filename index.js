const http = require('http')
const dotenv = require('dotenv')
dotenv.config() 
const app = require('./app')
const port = process.env.PORT

const server = http.createServer(app)

server.listen(port)

console.log('Server is up on port ' + port)

