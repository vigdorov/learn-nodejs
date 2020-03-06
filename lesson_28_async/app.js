const domain = require('domain');
const serverDomain = domain.create();
const fs = require('fs');


serverDomain.on('error', (error) => {
    fs.readFile('log.txt', (err, data) => {
        const writeData = `${data ? data + '\n' : ''}${error}`;
        fs.writeFile('log.txt', writeData, () => {
            console.log('Домен перехватил %s', error);
        });
    });
    
});

serverDomain.run(() => {
    const server = require('./server');
    server.listen(3000);
})