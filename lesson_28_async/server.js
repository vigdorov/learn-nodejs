const http = require('http');
const fs = require('fs');

const handler = (req, res) => {
    if (req.url === '/') {
        fs.readFile('index.html', (err, content) => {
            if (err) throw err;

            res.end(content);
        })
    } else {
        res.statusCode = 404;
        res.enf('Not Found');
    }
};

const server = new http.createServer(handler);
module.exports = server;