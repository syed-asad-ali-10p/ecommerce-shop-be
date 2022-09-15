const http = require('http');
const app = require('./app');
const dbConnect = require('./utils/database')

const server = http.createServer(app);
const host = process.env.HOST
const port = process.env.PORT

dbConnect(client => {
    server.listen(port, host, console.log(`Server listening at ${host}:${port}`));
})