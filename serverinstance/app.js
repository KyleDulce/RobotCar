const Express = require("express")();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
Express.use(cors());
const Http = require("http").createServer(Express);
const Socketio = require("socket.io")(Http);

var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

const ioc = new require("./iocontrol.js");

const iocontrol = new ioc(Socketio);

iocontrol.setupSocket();

const port = process.env.PORT || 3500

Express.get("*", function(req, res) {
    var file = path.join(__dirname, req.path);
    
    console.log("request of: " + req.path);

    if(req.path == "/public/picture.jpeg") {
        file = path.join(__dirname, "./public/picture.jpeg");
    }

    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    var s = fs.createReadStream(file);

    s.on('open', function() {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function() {
        res.set('Content-Type', 'test/plain');
        res.status(404).end('Not found');
    });
});

Http.listen(port, () => {
    console.log(`Listening at port ${port}`);
});