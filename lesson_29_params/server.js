const http = require('http');
const options = require('optimist').argv;

const handler = (req, res) => {
    console.log(req.url);

    res.end(`Your url is - ${req.url}`);
};

const server = http.createServer(handler);

server.listen(options.port || 3000);