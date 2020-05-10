require('./monkey');

const app = require('express')();
const server = require('http').createServer(app);
const fs = require('fs');
const path = require('path');
const root = path.dirname(require.main.filename);
const aaa = fs.promises.readdir('aaa');

app.get('*', (req, res) => Promise.resolve(
    (async () => {
        const name = (await aaa).random();
        res.sendFile(`aaa/${name}`, { root });
    })()
));

server.listen(process.env.SERVER_PORT || 1337);
