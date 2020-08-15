const express = require('express')
const projectsRoute = require('./routes/projects')
const actionsRoute = require('./routes/actions')
const server = express()

server.use(express.json())
server.use('/api/projects', projectsRoute)
server.use('/api/actions', actionsRoute)

server.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to my API" }) // can also use send("HTML") :shrug:
})

const port = process.env.PORT || 5000
require('dotenv').config()

server.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

module.exports = server;