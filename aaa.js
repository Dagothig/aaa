require('./monkey');

const app = require('express')();
const server = require('http').createServer(app);
const fs = require('fs');
const path = require('path');
const root = path.dirname(require.main.filename);
const aaa = fs.promises.readdir('aaa');

app.get('/', (req, res) =>
    aaa.then(files =>
        res.sendFile(`aaa/${ files.random() }`, { root })));

server.listen(process.env.SERVER_PORT || 1337);
