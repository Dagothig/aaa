require('./monkey');
const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const aaas = [
    { path: 'aaa', regex: /^a+$/ },
    { path: 'victwere', regex: /^victwe+re$/ },
    { path: 'HPQCMAAS', regex: /^hpqcmaas$/ }
].map(aaa => ({ ...aaa, dir: fs.promises.readdir(aaa.path) }));

const getAaa = host => {
    const sub = (host || '').split('.')[0];
    return aaas.find(aaa => sub.match(aaa.regex)) || aaas[0];
};

const root = path.dirname(require.main.filename);

const server = http.createServer(async (req, res) => {
    try {
        const aaa = getAaa(req.headers.host);
        const file = (await aaa.dir).random();
        res.statusCode = 200;
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache, no-store');
        res.setHeader('Content-type', mime.contentType(file));
        res.write(await fs.promises.readFile(`${ root }/${ aaa.path }/${ file }`));
    } catch(err) {
        console.error(err);
        res.statusCode = 500;
    }
    res.end();
});

const port = process.env.SERVER_PORT || 1337;
server.listen(port);
console.log('aaa listening on', port);
