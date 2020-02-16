global.clients = [];

const chat = {
  subscribe: function (req, res) {
    clients.push(res);
    res.on('close', () => {
      clients.splice(clients.indexOf(res), 1);
    })
  },
  publish: function (message) {
    clients.forEach(res => {
      res.end(message);
    });
  
    clients = [];
  },
};

setInterval(() => {
  console.log({clients: clients.length});
}, 2000).unref();

module.exports = chat;
