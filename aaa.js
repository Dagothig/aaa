require('./monkey');

const dirs = ['victwere', 'aaa'];
const getDir = host => {
    const sub = (host || '').split('.')[0];
    const dir = dirs.find(dir => dir === sub);
    return dir || 'aaa';
};

const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.dirname(require.main.filename);
const aaas = Object.fromEntries(dirs.map(dir => [dir, fs.promises.readdir(dir)]));

const server = http.createServer(async (req, res) => {
    try {
        const dir = getDir(req.headers.host);
        const file = (await aaas[dir]).random();
        res.statusCode = 200;
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache, no-store');
        res.write(await fs.promises.readFile(`${ root }/${ dir }/${ file }`));
    } catch(err) {
        console.error(err);
        res.statusCode = 500;
    }
    res.end();
});

const port = process.env.SERVER_PORT || 1337;
server.listen(port);
console.log('aaa listening on', port);
