
const gpio = require("rpi-gpio");
const webcam = require("node-webcam");
const fs = require('fs');

//pins
const MOTOR_FL = 21;
const MOTOR_BL = 26;
const MOTOR_FR = 20;
const MOTOR_BR = 16;

//webcam info
var opts = {

    //Picture related
    width: 352,
    height: 288,
    quality: 100,

    // Number of frames to capture
    // More the frames, longer it takes to capture
    // Use higher framerate for quality. Ex: 60
    frames: 60,

    //Delay in seconds to take shot
    //if the platform supports miliseconds
    //use a float (0.1)
    //Currently only on windows
    delay: 0,

    //Save shots in memory
    saveShots: true,

    // [jpeg, png] support varies
    // Webcam.OutputTypes
    output: "jpeg",

    //Which camera to use
    //Use Webcam.list() for results
    //false for default device
    device: '/dev/video1',

    // [location, buffer, base64]
    // Webcam.CallbackReturnTypes
    callbackReturn: "location",

    //Logging
    verbose: false
};

function iocontrol(socket) {
    this.Socketio = socket;
    this.camera = webcam.create(opts);
}

//0 STOP 1 FORWARD 2 BACKWARD 3 LEFT 4 RIGHT
iocontrol.prototype.setupSocket = function setupSocket() {
    //setup pins
    gpio.setMode(gpio.MODE_BCM);
    //motors
    gpio.setup(MOTOR_FL, gpio.DIR_OUT, onError);
    gpio.setup(MOTOR_BL, gpio.DIR_OUT, onError);
    gpio.setup(MOTOR_FR, gpio.DIR_OUT, onError);
    gpio.setup(MOTOR_BR, gpio.DIR_OUT, onError);

    //setup socket
    this.Socketio.on("connection", (socket) => {

        socket.on("move", data => {
            moveDirection(data);
        });

        socket.on("captureImage", data => {

            if(!fs.existsSync("./public")) {
                fs.mkdirSync("./public");
            }

            this.camera.capture("public/picture.jpeg", function(err, pic) {

                if(err) {
                    console.log("Problem with image capture: " + err);
                } else {
                    socket.emit("ImageResult", "public/picture.jpeg");
                    console.log("sent image")
                }
            });
        });
    });
}

//0 STOP 1 FORWARD 2 BACKWARD 3 LEFT 4 RIGHT
function moveDirection(dir) {
    switch (dir) {
        case 1:
            setMotors(true, false, true, false);
            break;
        case 2:
            setMotors(false, true, false, true);
            break;
        case 3:
            setMotors(false, false, true, false);
            break;
        case 4:
            setMotors(true, false, false, false);
            break;
        default:
            setMotors(false, false, false, false);
    }
}

function setMotors(forwardL, backwardL, forwardR, backwardR) {
    //turn off all motors
    gpio.write(MOTOR_FL, forwardL, onError);
    gpio.write(MOTOR_BL, backwardL, onError);
    gpio.write(MOTOR_FR, forwardR, onError);
    gpio.write(MOTOR_BR, backwardR, onError);
}

function onError(error) {
    if (error != null) {
        console.log("PROBLEM WITH GPIO " + error);
    }
}

module.exports = iocontrol;