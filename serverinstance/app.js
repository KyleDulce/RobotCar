const Express = require("express")();
const cors = require('cors');
Express.use(cors());
const Http = require("http").createServer(Express);
const Socketio = require("socket.io")(Http);

const port = process.env.PORT || 3500

Socketio.on("connection", (socket) => {

    socket.on("sendMessage", data=> {
        console.log("Recieved " + data);
        socket.emit("recieveMessage", "I got it!");
    });

});

Http.listen(port, () => {
    console.log(`Listening at port ${port}`);
});