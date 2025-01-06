require('./monkey');
const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const root = path.dirname(require.main.filename);

(async () => {
    const aaas = await Promise.all([
        { path: 'aaa', regex: /^a+$/ },
        { path: 'victwere', regex: /^victwe+re$/ },
        { path: 'HPQCMAAS', regex: /^hpqcmaas$/ }
    ].map(async aaa => {
        const dir = await fs.promises.readdir(aaa.path);
        const help = dir.find(f => f === "help.txt");
        return {
            ...aaa,
            dir: dir.filter(f => f !== "help.txt"),
            help: help ? await fs.promises.readFile(`${ root }/${ aaa.path }/${ help }`) : null
        };
    }));

    const getAaa = host => {
        const sub = (host || '').split('.')[0];
        return aaas.find(aaa => sub.match(aaa.regex)) || aaas[0];
    };

    const server = http.createServer(async (req, res) => {
        try {
            const aaa = getAaa(req.headers.host);
            res.statusCode = 200;
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache, no-store');
            if (req.url.includes("help") && aaa.help) {
                res.setHeader('Content-type', "text/plain; charset=utf-8");
                res.write(aaa.help);
            } else {
                const file = aaa.dir.random();
                res.setHeader('Content-type', mime.contentType(file));
                res.write(await fs.promises.readFile(`${ root }/${ aaa.path }/${ file }`));
            }
        } catch(err) {
            console.error(err);
            res.statusCode = 500;
        }
        res.end();
    });

    const port = process.env.SERVER_PORT || 1337;
    server.listen(port);
    console.log('aaa listening on', port);
})();
