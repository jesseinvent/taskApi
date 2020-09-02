const http = require('http');
const app = require('./src/app');
const config = require('./src/config/config');

// Node Server
const server = http.createServer(app);

// Server port
const PORT = config.PORT;

//
server.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
