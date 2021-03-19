const { app, BrowserWindow } = require('electron');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  //win.loadFile('index.html')
  win.loadURL("file:///dist/KassiesMaster/index.html");
  win.removeMenu();

  //win.webContents.openDevTools();
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});

// const io = require("socket.io-client");
// const socket = io("http://10.0.0.220:3500");
// socket.connect();

// socket.on("recieveMessage", function(data) {
//     console.log("I got " + data);
// });

// //socket.emit("sendMessage", "Hello World");
// setTimeout(function () {
//         socket.emit("sendMessage", "Hello World");
//         console.log("sent");
// }, 5000);