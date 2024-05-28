require('dotenv').config()
const http = require('http')

const PORT = process.env.PORT || 5001

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-type': 'text/html'})
    res.end('<h1>Header</h1>')
})


server.listen(PORT, () => {console.log(`Server started on ${PORT}`)})
