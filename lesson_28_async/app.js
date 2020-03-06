const domain = require('domain');
const serverDomain = domain.create();



serverDomain.on('error', (err) => {
    console.log('Домен перехватил %s', err);
});

serverDomain.run(() => {
    const server = require('./server');
    server.listen(3000);
})