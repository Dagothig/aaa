require('./monkey');

const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.dirname(require.main.filename);
const aaa = fs.promises.readdir('aaa');

const server = http.createServer(async (req, res) => {
    try {
        res.statusCode = 200;
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache, no-store');
        res.write(await fs.promises.readFile(`${ root }/aaa/${ (await aaa).random() }`));
    } catch(err) {
        console.error(err);
        res.statusCode = 500;
    }
    res.end();
});

const port = process.env.SERVER_PORT || 1337;
server.listen(port);
console.log('aaa listening on', port);
