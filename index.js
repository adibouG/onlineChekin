const createServer = require('./server').create;
const port = process.env.PORT || 3000;

createServer.then(function(server) {
    server.listen(port, () => {
        console.log(`Listening at http://localhost:${port}`);
    });
});
